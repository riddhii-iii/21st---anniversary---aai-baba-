import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { EpisodeDetail } from './pages/EpisodeDetail'
import { SeasonPage } from './pages/SeasonPage'
import { PageShell } from './components/PageShell'
import { CinematicLoader } from './components/CinematicLoader'
import { ScrollToTop } from './components/ScrollToTop'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageShell>
              <Home />
            </PageShell>
          }
        />
        <Route
          path="/season/:seasonId"
          element={
            <PageShell>
              <SeasonPage />
            </PageShell>
          }
        />
        <Route
          path="/episode/:episodeId"
          element={
            <PageShell>
              <EpisodeDetail />
            </PageShell>
          }
        />
        <Route
          path="*"
          element={
            <PageShell>
              <Home />
            </PageShell>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 3000)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>{loading ? <CinematicLoader /> : null}</AnimatePresence>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
