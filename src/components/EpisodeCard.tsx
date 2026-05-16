import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Episode } from '../types'
import { useMemoryImages } from '../hooks/useMemoryImages'

type EpisodeCardProps = {
  episode: Episode
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const [cover] = useMemoryImages(episode.years, 1)

  return (
    <motion.article
      whileHover={{
        scale: 1.025,
        y: -10,
        rotateX: 3,
        rotateY: 4,
        transformPerspective: 1100,
      }}
      className="cinema-depth group relative overflow-hidden rounded-sm border border-beige-300/18 bg-crimson-900 shadow-[0_28px_80px_rgba(45,0,0,0.34)] transition-all duration-500"
    >
      {cover ? (
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.58] sepia-[0.16] transition duration-1000 group-hover:scale-110 group-hover:opacity-[0.78]"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,240,229,0.16),_transparent_38%),linear-gradient(180deg,rgba(8,4,5,0.12),rgba(45,0,0,0.92))]" />
      <div className="absolute inset-0 opacity-20 film-grain" />
      <Link
        to={`/episode/${episode.id}`}
        className="relative flex h-full min-h-[300px] flex-col justify-end gap-4 p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex rounded-full border border-beige-300/15 bg-crimson-950/50 px-3 py-1 text-[0.68rem] uppercase tracking-[0.26em] text-beige-300 backdrop-blur">
            EP {episode.episodeNumber}
          </span>
          <span className="text-xs uppercase tracking-[0.26em] text-beige-500">{episode.yearLabel}</span>
        </div>
        <div className="space-y-2">
          <h4 className="text-3xl font-serif leading-tight text-beige-300 transition group-hover:text-beige-500">
            {episode.title}
          </h4>
          <p className="max-w-[24rem] text-sm leading-6 text-beige-400">
            {episode.description}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-beige-400">
          {episode.highlights.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-beige-300/15 bg-crimson-950/45 px-3 py-1 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>
      </Link>
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-beige-300/40 to-transparent" />
    </motion.article>
  )
}
