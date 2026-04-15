import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const PHONE = '+17326424885'
const PHONE_DISPLAY = '(732) 642-4885'

// EDIT THIS LIST: Confirm with Alex the full cities served
const CITIES = [
  'Stuart, FL',
  'Jupiter, FL',
  'Palm Beach, FL',
  'West Palm Beach, FL',
  'Palm Beach Gardens, FL',
]

const SERVICES = [
  {
    icon: '✈',
    title: 'Airport Transfers',
    desc: 'Punctual door-to-door airport service. PBI, MIA, and FLL covered. Real-time flight tracking — we adjust for delays so you never wait.',
  },
  {
    icon: '💼',
    title: 'Corporate Travel',
    desc: 'Executive transportation for meetings, conferences, and roadshows. Discreet, professional, and always on time.',
  },
  {
    icon: '💍',
    title: 'Weddings & Events',
    desc: 'Make your special occasions unforgettable. Impeccable luxury vehicles and attentive chauffeur service for your most important moments.',
  },
  {
    icon: '🌙',
    title: 'Night Out & Special Events',
    desc: 'Galas, dinners, concerts, and sporting events. Arrive in style. Leave the driving to us.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Nav />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Subtle gold gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #C5A328 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <img
            src="/logo.png"
            alt="111 Elite Car Service"
            className="mx-auto mb-8 w-auto"
            style={{ height: 'clamp(140px, 20vw, 220px)', maxWidth: '420px' }}
          />
          <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight">
            Luxury transportation,<br />
            <span className="text-gold-500">redefined.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Professional chauffeur service. Premium vehicles. Seamless service — every time.
            Serving Palm Beach County and the Treasure Coast of Florida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book" className="btn-gold">
              Book an Inquiry
            </Link>
            <a href={`tel:${PHONE}`} className="btn-outline">
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-dark-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-500 text-xs tracking-widest uppercase font-medium text-center mb-4">What We Offer</p>
          <h2 className="section-title text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-dark-700 border border-dark-600 hover:border-gold-500/40 transition-colors p-8 group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-serif text-2xl text-gold-400 mb-3 group-hover:text-gold-300 transition-colors">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-500 text-xs tracking-widest uppercase font-medium text-center mb-4">The Difference</p>
          <h2 className="section-title text-center mb-4">Why Choose 111 Elite</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
            Your privacy matters. Quiet, confidential service guaranteed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'On-Time Guarantee', detail: 'We track your flight and adjust. You arrive when you need to.' },
              { label: 'Premium Fleet', detail: 'Luxury SUVs and executive sedans, immaculately maintained.' },
              { label: 'Discreet Service', detail: 'Professional, quiet, confidential. Your business stays yours.' },
            ].map((item) => (
              <div key={item.label}>
                <div className="w-12 h-px bg-gold-500 mx-auto mb-6" />
                <h3 className="font-serif text-xl text-white mb-3">{item.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-24 px-6 bg-dark-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold-500 text-xs tracking-widest uppercase font-medium text-center mb-4">Service Area</p>
          <h2 className="section-title text-center mb-4">East Coast of Florida</h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Proudly serving the Treasure Coast and Palm Beach County — and beyond.
          </p>
          {/* EDIT THIS LIST: user to confirm full cities list in morning */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {CITIES.map((city) => (
              <div key={city} className="border border-gold-500/30 text-center py-4 px-2">
                <span className="text-gold-400 font-serif text-lg">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1a1a1a 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Ready to Ride?</h2>
          <p className="text-gray-400 text-lg mb-10">
            Contact us to arrange your luxury chauffeur experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book" className="btn-gold">
              Submit a Booking Inquiry
            </Link>
            <a href={`tel:${PHONE}`} className="btn-outline">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-gold-500/20 py-12 px-6 text-center">
        <img src="/logo.png" alt="111 Elite Car Service" className="h-12 mx-auto mb-6 opacity-70" />
        <p className="text-gray-500 text-sm mb-2">
          <a href={`tel:${PHONE}`} className="text-gold-500 hover:text-gold-400 transition-colors">{PHONE_DISPLAY}</a>
          {' '}&nbsp;|&nbsp;{' '}
          <a href="mailto:book@111elitecarservice.com" className="text-gold-500 hover:text-gold-400 transition-colors">book@111elitecarservice.com</a>
        </p>
        <p className="text-gray-600 text-xs mt-4">&copy; 2026 111 Elite Car Service. All rights reserved.</p>
      </footer>
    </div>
  )
}
