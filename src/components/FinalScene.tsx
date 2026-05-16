import { motion } from 'framer-motion'

type FinalSceneProps = {
  text: string
}

export function FinalScene({ text }: FinalSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative mx-auto max-w-5xl overflow-hidden py-16 text-center"
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-beige-300/25 to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Still Streaming</p>
        <h2 className="mt-4 text-4xl font-serif font-semibold text-beige-300 drop-shadow-[0_0_32px_rgba(197,166,126,0.18)] sm:text-5xl">
        After 21 years...
        </h2>
        <p className="mx-auto mt-6 max-w-2xl whitespace-pre-wrap text-base leading-8 text-beige-400 sm:text-lg">
          {text}
        </p>
      </div>
    </motion.div>
  )
}
