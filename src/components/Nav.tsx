import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const PHONE = '+17326424885'
const PHONE_DISPLAY = '(732) 642-4885'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="111 Elite Car Service"
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-xs tracking-widest uppercase font-medium transition-colors ${pathname === '/' ? 'text-gold-500' : 'text-gray-300 hover:text-gold-500'}`}
          >
            Home
          </Link>
          <Link
            to="/book"
            className={`text-xs tracking-widest uppercase font-medium transition-colors ${pathname === '/book' ? 'text-gold-500' : 'text-gray-300 hover:text-gold-500'}`}
          >
            Book Inquiry
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="btn-gold text-xs"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-px bg-white mb-1.5" />
          <div className="w-6 h-px bg-white mb-1.5" />
          <div className="w-6 h-px bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-900 border-t border-gold-500/20 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-gray-300 hover:text-gold-500">Home</Link>
          <Link to="/book" onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-gray-300 hover:text-gold-500">Book Inquiry</Link>
          <a href={`tel:${PHONE}`} className="btn-gold text-center text-xs">{PHONE_DISPLAY}</a>
        </div>
      )}
    </nav>
  )
}
