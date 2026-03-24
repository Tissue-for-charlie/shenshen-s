import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Music = lazy(() => import('./pages/Music'))
const Career = lazy(() => import('./pages/Career'))
const Awards = lazy(() => import('./pages/Awards'))
const Videos = lazy(() => import('./pages/Videos'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Memes = lazy(() => import('./pages/Memes'))
const Fanworks = lazy(() => import('./pages/Fanworks'))

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
)

const AppRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/music" element={<PageTransition><Music /></PageTransition>} />
        <Route path="/career" element={<PageTransition><Career /></PageTransition>} />
        <Route path="/awards" element={<PageTransition><Awards /></PageTransition>} />
        <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/memes" element={<PageTransition><Memes /></PageTransition>} />
        <Route path="/fanworks" element={<PageTransition><Fanworks /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#001219] text-white selection:bg-[#00B4D8]/30">
        {/* Background gradient effects */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] bg-[radial-gradient(circle_at_center,_rgba(0,180,216,0.15)_0%,_transparent_70%)]" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[150%] w-[150%] bg-[radial-gradient(circle_at_center,_rgba(0,119,182,0.15)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <Header />

        <main className="pt-24">
          <Suspense fallback={
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00B4D8] border-t-transparent" />
            </div>
          }>
            <AppRoutes />
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
