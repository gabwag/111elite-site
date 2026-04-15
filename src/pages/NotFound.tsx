import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-8xl text-gold-500/30 mb-4">404</h1>
        <h2 className="font-serif text-3xl text-white mb-4">Page not found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-gold">Return to Home</Link>
      </div>
    </div>
  )
}
