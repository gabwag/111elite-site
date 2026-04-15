import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Book from './pages/Book'
import Banner from './pages/Banner'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Book />} />
      <Route path="/banner" element={<Banner />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
