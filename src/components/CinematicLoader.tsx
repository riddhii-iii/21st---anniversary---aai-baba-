import { motion } from 'framer-motion'

export function CinematicLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#080405]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,166,126,0.16),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(220,0,0,0.16),transparent_32%),linear-gradient(180deg,#080405,#2d0000)]" />
      <div className="light-leak absolute inset-[-10%] mix-blend-screen" />
      <div className="drifting-grain absolute inset-[-8%] opacity-20 mix-blend-screen film-grain" />

      <motion.div
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mx-auto max-w-2xl px-8 text-center"
      >
        <p className="text-xs uppercase tracking-[0.52em] text-beige-500">
          opening the archive
        </p>
        <h2 className="mt-5 text-5xl font-serif leading-tight text-beige-300 sm:text-7xl">
          21 years of becoming home
        </h2>
        <p className="handwritten mx-auto mt-6 max-w-md text-2xl leading-8 text-beige-500">
          Please wait. The memories are finding their light.
        </p>
        <div className="mx-auto mt-10 h-px w-48 overflow-hidden bg-beige-300/15">
          <motion.div
            className="h-full bg-beige-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
