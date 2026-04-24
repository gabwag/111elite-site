/**
 * Cloudflare Pages Function — POST /api/book
 * Handles booking inquiry submissions.
 *
 * Environment variables required (set in CF Pages dashboard or wrangler.toml):
 *   ALEX_EMAIL      — Alex's personal/business email (fill after user confirms)
 *   ALEX_PHONE      — Alex's 10-digit phone number, no dashes (fill after user confirms)
 *   FROM_EMAIL      — Sending address: contact@111elitecarservice.com
 *   RESEND_API_KEY  — Only needed if MailChannels is unavailable
 *
 * D1 binding: DB (bound in wrangler.toml as [[d1_databases]])
 */

interface Env {
  DB: D1Database
  ALEX_EMAIL: string
  ALEX_EMAIL_CC?: string
  ALEX_PHONE: string
  FROM_EMAIL: string
  RESEND_API_KEY?: string
  RATE_LIMIT_KV: KVNamespace
}

interface BookingPayload {
  name: string
  phone: string
  email: string
  pickup: string
  dropoff?: string
  date: string
  time: string
  passengers?: string
  notes?: string
  website?: string // honeypot
}

// Rate limiting: 3 submissions per IP per 10 minutes
const RATE_LIMIT = 3
const RATE_WINDOW_SECONDS = 600

// Carrier email-to-SMS gateways — send to all 4 until Alex confirms carrier
// Duplicates are cheap; SMS delivers to the right one; others silently fail
const SMS_GATEWAYS = (phone: string): string[] => [
  `${phone}@vtext.com`,          // Verizon
  `${phone}@txt.att.net`,        // AT&T
  `${phone}@tmomail.net`,        // T-Mobile
  `${phone}@messaging.sprintpcs.com`, // Sprint/T-Mobile
]

function sanitize(s: string | undefined, max = 500): string {
  if (!s) return ''
  return s.trim().slice(0, max).replace(/[<>]/g, '')
}

function validatePayload(body: BookingPayload): string | null {
  if (!body.name?.trim()) return 'Name is required'
  if (!body.phone?.trim()) return 'Phone is required'
  if (!body.email?.trim() || !body.email.includes('@')) return 'Valid email is required'
  if (!body.pickup?.trim()) return 'Pickup address is required'
  if (!body.date?.trim()) return 'Date is required'
  return null
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rl:${ip}`
  const raw = await env.RATE_LIMIT_KV.get(key)
  const count = raw ? parseInt(raw, 10) : 0
  if (count >= RATE_LIMIT) return false
  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS })
  return true
}

async function sendViaMailChannels(to: string, subject: string, html: string, text: string, fromEmail: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: fromEmail, name: '111 Elite Car Service' },
        subject,
        content: [
          { type: 'text/plain', value: text },
          { type: 'text/html', value: html },
        ],
      }),
    })
    return res.ok || res.status === 202
  } catch {
    return false
  }
}

async function sendViaResend(to: string, subject: string, html: string, text: string, fromEmail: string, apiKey: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `111 Elite Car Service <${fromEmail}>`,
        to: [to],
        subject,
        html,
        text,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string,
  env: Env
): Promise<boolean> {
  const from = env.FROM_EMAIL || 'bookings@send.111elitecarservice.com'

  // Try MailChannels first (free for CF Workers)
  const mcOk = await sendViaMailChannels(to, subject, html, text, from)
  if (mcOk) return true

  // Fall back to Resend
  if (env.RESEND_API_KEY) {
    return sendViaResend(to, subject, html, text, from, env.RESEND_API_KEY)
  }

  return false
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://111elitecarservice.com',
    'Content-Type': 'application/json',
  }

  // Parse body
  let body: BookingPayload
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: corsHeaders })
  }

  // Honeypot check — bots fill hidden 'website' field
  if (body.website) {
    // Silently accept (don't tip off bots) but do nothing
    return new Response(JSON.stringify({ ok: true, id: 'honeypot' }), { status: 200, headers: corsHeaders })
  }

  // Validate
  const validationError = validatePayload(body)
  if (validationError) {
    return new Response(JSON.stringify({ error: validationError }), { status: 422, headers: corsHeaders })
  }

  // Rate limit (fails open if KV binding unavailable)
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown'
  const allowed = env.RATE_LIMIT_KV
    ? await checkRateLimit(env, ip).catch(() => true)
    : true // no KV binding — skip rate limit
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a few minutes and try again.' }),
      { status: 429, headers: corsHeaders }
    )
  }

  // Sanitize
  const booking = {
    name: sanitize(body.name, 100),
    phone: sanitize(body.phone, 30),
    email: sanitize(body.email, 200),
    pickup: sanitize(body.pickup, 300),
    dropoff: sanitize(body.dropoff, 300),
    date: sanitize(body.date, 20),
    time: sanitize(body.time, 20),
    passengers: sanitize(body.passengers, 5) || '1',
    notes: sanitize(body.notes, 1000),
    ip,
    user_agent: request.headers.get('User-Agent')?.slice(0, 300) || '',
  }

  // Write to D1 (gracefully skip if DB binding unavailable)
  let bookingId = 'db-unavailable'
  if (env.DB) try {
    const result = await env.DB.prepare(`
      INSERT INTO bookings (name, phone, email, pickup, dropoff, date, time, passengers, notes, ip, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      booking.name, booking.phone, booking.email,
      booking.pickup, booking.dropoff, booking.date, booking.time,
      booking.passengers, booking.notes, booking.ip, booking.user_agent
    ).run()
    bookingId = String(result.meta?.last_row_id ?? 'ok')
  } catch (e) {
    console.error('D1 write error:', e)
    // Don't fail the request — still send emails
  }

  const alexEmail = env.ALEX_EMAIL || 'ALEX_EMAIL_NOT_SET@example.com'
  const alexPhone = (env.ALEX_PHONE || '').replace(/\D/g, '') // strip non-digits

  // Build Cal.com prefill URL for the Ride Booking event
  // Alex opens this → lands on calendar for requested date → name/email/phone already filled → clicks slot
  const calBase = 'https://cal.com/team/111-elite-car-service/ride-booking'
  // Normalize phone to E.164 US format so Cal.com's phone input recognizes it as US
  // (raw digits without +1 can be parsed as random country codes — e.g. Chile +56)
  const digits = booking.phone.replace(/\D/g, '')
  let normalizedPhone = booking.phone
  if (digits.length === 10) normalizedPhone = `+1${digits}`
  else if (digits.length === 11 && digits.startsWith('1')) normalizedPhone = `+${digits}`
  else if (booking.phone.startsWith('+')) normalizedPhone = booking.phone
  // Notes: passengers + requested time + customer notes only (pickup/dropoff have their own fields).
  const notesForCal = [
    `Passengers: ${booking.passengers}`,
    `Requested time: ${booking.time}`,
    booking.notes ? `Customer notes: ${booking.notes}` : '',
  ].filter(Boolean).join(' | ')
  const calParams = new URLSearchParams({
    name: booking.name,
    email: booking.email,
    // Phone — try multiple aliases. smsReminderNumber is the workflow-added field shown in the UI.
    smsReminderNumber: normalizedPhone,
    'attendeePhoneNumber': normalizedPhone,
    phone: normalizedPhone,
    // Pickup → custom text field "pickup_location_manual" (your slug). Prefillable + exposes {pickup_location_manual} workflow token.
    'pickup_location_manual': booking.pickup,
    // Dropoff → dedicated custom text field "Destination-address" (case-sensitive slug)
    'Destination-address': booking.dropoff || '',
    notes: notesForCal,
    'metadata[pickup]': booking.pickup,
    'metadata[dropoff]': booking.dropoff || '',
    'metadata[passengers]': booking.passengers,
    'metadata[requested_time]': booking.time,
    'metadata[source]': 'website_form',
    'metadata[booking_id]': bookingId,
    date: booking.date,
    month: booking.date.slice(0, 7), // YYYY-MM
  })
  const calPrefillUrl = `${calBase}?${calParams.toString()}`

  // Email content for Alex
  const alexSubject = `New Ride Form Submitted — ${booking.name} — ${booking.date} ${booking.time}`
  const alexText = `
NEW RIDE FORM SUBMITTED — 111 Elite Car Service
========================================

NAME:        ${booking.name}
PHONE:       ${booking.phone}
EMAIL:       ${booking.email}

PICKUP:      ${booking.pickup}
DROPOFF:     ${booking.dropoff || '—'}
DATE:        ${booking.date}
TIME:        ${booking.time}
PASSENGERS:  ${booking.passengers}

NOTES:
${booking.notes || '—'}

CONFIRM THIS RIDE IN CAL.COM (prefilled — just pick the slot):
${calPrefillUrl}

Booking ID: ${bookingId}
`.trim()

  const alexHtml = `
<div style="font-family:Arial,sans-serif;max-width:620px;background:#0a0908;color:#eee;padding:32px;border-top:3px solid #C5A328">
  <h2 style="color:#C5A328;margin:0 0 6px 0;letter-spacing:1px;text-transform:uppercase">New Ride Form Submitted</h2>
  <p style="color:#888;margin:0 0 24px 0;font-size:13px">Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET · Booking #${bookingId}</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr><td style="color:#8a8378;padding:8px 0;width:140px;font-size:12px;text-transform:uppercase;letter-spacing:1px">Name</td><td style="padding:8px 0;font-weight:600">${booking.name}</td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Phone</td><td style="padding:8px 0"><a href="tel:${booking.phone}" style="color:#C5A328;text-decoration:none;font-weight:600">${booking.phone}</a></td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Email</td><td style="padding:8px 0"><a href="mailto:${booking.email}" style="color:#C5A328;text-decoration:none">${booking.email}</a></td></tr>
    <tr><td colspan="2" style="border-top:1px solid #2a2519;padding:0"></td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Pickup</td><td style="padding:8px 0;font-weight:600">${booking.pickup}</td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Dropoff</td><td style="padding:8px 0">${booking.dropoff || '—'}</td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Date</td><td style="padding:8px 0;font-weight:600">${booking.date}</td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Time</td><td style="padding:8px 0;font-weight:600">${booking.time}</td></tr>
    <tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Passengers</td><td style="padding:8px 0">${booking.passengers}</td></tr>
    ${booking.notes ? `<tr><td style="color:#8a8378;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top">Notes</td><td style="padding:8px 0">${booking.notes}</td></tr>` : ''}
  </table>

  <div style="background:#15120c;border-left:3px solid #C5A328;padding:18px 20px;margin:24px 0">
    <p style="margin:0 0 14px 0;color:#eee;font-size:14px">Ready to confirm? One click opens Cal.com with the customer info already filled — just pick the slot.</p>
    <a href="${calPrefillUrl}" style="background:#C5A328;color:#0a0908;padding:14px 28px;text-decoration:none;font-weight:700;display:inline-block;letter-spacing:1px;text-transform:uppercase;font-size:13px">Confirm in Cal.com →</a>
  </div>

  <p style="color:#666;font-size:11px;margin-top:24px;border-top:1px solid #2a2519;padding-top:16px">Sent from 111elitecarservice.com · IP ${ip}</p>
</div>
`

  // SMS text (short, for email-to-SMS gateway — 160 char target)
  const smsText = `111Elite NEW BOOKING: ${booking.name} | ${booking.phone} | ${booking.date} ${booking.time} | From: ${booking.pickup}`.slice(0, 160)

  // Customer confirmation email
  const customerSubject = `Booking Requested — 111 Elite Car Service`
  const customerText = `
Hi ${booking.name},

Thank you for your booking request with 111 Elite Car Service!

We've received your request for ${booking.date} at ${booking.time} from ${booking.pickup}.

Alex will be in touch to confirm your reservation details. Please allow us the time to properly process your booking request and reach back to you.

Questions? Contact us: (732) 642-4885
Or reply to this email: contact@111elitecarservice.com

111 Elite Car Service
Luxury Chauffeur | Palm Beach & Treasure Coast
`.trim()

  const customerHtml = `
<div style="font-family:Arial,sans-serif;max-width:600px;background:#111;color:#fff;padding:32px;border-top:3px solid #C5A328">
  <img src="https://111elitecarservice.com/logo.png" alt="111 Elite Car Service" style="height:60px;margin-bottom:24px" />
  <h2 style="color:#C5A328;margin-top:0">Booking Requested</h2>
  <p style="color:#ccc">Hi ${booking.name},</p>
  <p style="color:#ccc">Thank you for your booking request. We've received it successfully.</p>
  <table style="width:100%;border-collapse:collapse;margin:20px 0">
    <tr><td style="color:#999;padding:6px 0;width:120px">Date</td><td style="padding:6px 0">${booking.date}</td></tr>
    <tr><td style="color:#999;padding:6px 0">Time</td><td style="padding:6px 0">${booking.time}</td></tr>
    <tr><td style="color:#999;padding:6px 0">Pickup</td><td style="padding:6px 0">${booking.pickup}</td></tr>
    ${booking.dropoff ? `<tr><td style="color:#999;padding:6px 0">Dropoff</td><td style="padding:6px 0">${booking.dropoff}</td></tr>` : ''}
  </table>
  <p style="color:#ccc">Alex will be in touch to confirm your reservation details. Please allow us the time to properly process your booking request and reach back to you.</p>
  <p style="margin-top:24px">
    <a href="sms:+17326424885" style="background:#C5A328;color:#111;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block">Contact Us: (732) 642-4885</a>
  </p>
  <p style="color:#666;font-size:12px;margin-top:24px">111 Elite Car Service · contact@111elitecarservice.com · 111elitecarservice.com</p>
</div>
`

  // Send all emails in parallel (fire and forget individual failures)
  const emailPromises: Promise<boolean>[] = [
    // 1. Alex email notification (primary)
    sendEmail(alexEmail, alexSubject, alexHtml, alexText, env),
    // 2. Customer confirmation
    sendEmail(booking.email, customerSubject, customerHtml, customerText, env),
  ]

  // 1b. CC notification — second address (tester / future extra contact)
  if (env.ALEX_EMAIL_CC && env.ALEX_EMAIL_CC !== alexEmail) {
    emailPromises.push(
      sendEmail(env.ALEX_EMAIL_CC, alexSubject, alexHtml, alexText, env)
    )
  }

  // 3. SMS via all carrier gateways (if Alex phone is known)
  if (alexPhone) {
    for (const gateway of SMS_GATEWAYS(alexPhone)) {
      emailPromises.push(
        sendEmail(gateway, smsText, `<p>${smsText}</p>`, smsText, env)
      )
    }
  }

  // Wait for all (don't fail if some SMS gateways bounce)
  await Promise.allSettled(emailPromises)

  return new Response(
    JSON.stringify({ ok: true, id: bookingId }),
    { status: 200, headers: corsHeaders }
  )
}

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://111elitecarservice.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
