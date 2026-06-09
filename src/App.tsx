import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import AIVisibility from './pages/AIVisibility'
import Footer from './components/Footer'
import './App.css'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <Router>
      <div className="app">
        <Analytics />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/ai-bridge" element={<AIVisibility />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

