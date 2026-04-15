import { useState, useRef } from 'react'
import Nav from '../components/Nav'

interface FormData {
  name: string
  phone: string
  email: string
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: string
  notes: string
  // honeypot — must stay empty
  website: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  email: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  passengers: '1',
  notes: '',
  website: '', // honeypot
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function Book() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setState('success')
        setForm(INITIAL)
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg((data as { error?: string }).error || 'Something went wrong. Please try again or call us directly.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Nav />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs tracking-widest uppercase font-medium mb-4">Reserve Your Ride</p>
            <h1 className="font-serif text-5xl text-white mb-4">Book an Inquiry</h1>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Complete the form below and Alex will be in touch within a few hours to confirm your booking details.
            </p>
          </div>

          {/* Success state */}
          {state === 'success' && (
            <div className="bg-dark-700 border border-gold-500/50 p-8 text-center mb-8">
              <div className="text-3xl mb-4">✓</div>
              <h2 className="font-serif text-2xl text-gold-400 mb-2">Inquiry Received</h2>
              <p className="text-gray-400 text-sm">
                Thank you! Alex will be in touch with you within a few hours to confirm your reservation.
                A confirmation email is on its way.
              </p>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot — hidden from humans, bots fill it */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Pickup Address *</label>
              <input
                type="text"
                name="pickup"
                value={form.pickup}
                onChange={handleChange}
                placeholder="Hotel, address, or airport terminal"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Dropoff Address</label>
              <input
                type="text"
                name="dropoff"
                value={form.dropoff}
                onChange={handleChange}
                placeholder="Destination address or airport terminal"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="input-field"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="input-field"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Passengers</label>
                <select
                  name="passengers"
                  value={form.passengers}
                  onChange={handleChange}
                  className="input-field"
                >
                  {['1','2','3','4','5','6','7','8'].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Flight number, special requests, luggage count, etc."
                className="input-field resize-none"
              />
            </div>

            {state === 'error' && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-gold w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
            </button>

            <p className="text-gray-600 text-xs text-center">
              By submitting, you agree to be contacted by 111 Elite Car Service about your inquiry.
            </p>
          </form>

          {/* Direct contact fallback */}
          <div className="mt-12 pt-12 border-t border-dark-600 text-center">
            <p className="text-gray-500 text-sm mb-4">Prefer to call directly?</p>
            <a href="tel:+17326424885" className="text-gold-500 font-serif text-2xl hover:text-gold-400 transition-colors">
              (732) 642-4885
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
