import { motion } from 'framer-motion'
import type { Episode } from '../types'
import { EpisodeCard } from './EpisodeCard'

type SeasonCardProps = {
  title: string
  subtitle: string
  description: string
  episodes: Episode[]
  isOpen: boolean
  onToggle: () => void
}

export function SeasonCard({ title, subtitle, description, episodes, isOpen, onToggle }: SeasonCardProps) {
  return (
    <motion.div
      layout
      className="paper-texture overflow-hidden rounded-sm p-5 text-crimson-950 shadow-[0_34px_95px_rgba(45,0,0,0.24)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full flex-col items-start gap-3 text-left"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <p className="handwritten text-2xl text-crimson-700">{title}</p>
            <h3 className="mt-2 text-3xl font-serif text-crimson-950 sm:text-4xl">
              {subtitle}
            </h3>
          </div>
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-crimson-700/15 bg-crimson-700/10 text-xl text-crimson-800 transition group-hover:bg-crimson-700/18">
            {isOpen ? '-' : '+'}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-crimson-950/72 sm:text-base">{description}</p>
      </button>

      {isOpen ? (
        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
          className="mt-6 grid gap-5 xl:grid-cols-2"
        >
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </motion.div>
      ) : null}
    </motion.div>
  )
}
