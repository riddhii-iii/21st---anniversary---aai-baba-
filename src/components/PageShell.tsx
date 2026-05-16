import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function PageShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-crimson-950 text-beige-300">
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
