import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Episode } from '../types'
import { useMemoryImages } from '../hooks/useMemoryImages'

type SeasonPosterCardProps = {
  id: string
  title: string
  subtitle: string
  description: string
  episodes: Episode[]
}

export function SeasonPosterCard({ id, title, subtitle, description, episodes }: SeasonPosterCardProps) {
  const coverYears = episodes.flatMap((episode) => episode.years)
  const [cover] = useMemoryImages(coverYears, 1)
  const seasonNumber = title.replace(/\D/g, '').padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{
        y: -14,
        rotateX: 4,
        rotateY: -5,
        scale: 1.018,
        transformPerspective: 1200,
      }}
      transition={{ duration: 0.62 }}
      className="cinema-depth group relative overflow-hidden rounded-sm border border-beige-300/20 bg-beige-300 p-2 shadow-[0_30px_90px_rgba(45,0,0,0.38)]"
    >
      <Link to={`/season/${id}`} className="relative block min-h-[430px] overflow-hidden rounded-sm">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-72 sepia-[0.14] transition duration-1000 group-hover:scale-110 group-hover:opacity-90"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,4,5,0.08),rgba(45,0,0,0.88)),radial-gradient(circle_at_top,rgba(248,240,229,0.18),transparent_42%)]" />
        <div className="absolute inset-0 opacity-25 film-grain" />
        <div className="absolute left-5 top-5 rounded-full bg-beige-300/88 px-3 py-1 text-xs font-bold tracking-[0.24em] text-crimson-800">
          {seasonNumber}
        </div>
        <div className="relative flex min-h-[430px] flex-col justify-end p-6">
          <p className="handwritten text-2xl text-beige-500">{title}</p>
          <h3 className="mt-2 text-3xl font-serif leading-tight text-beige-300">{subtitle}</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-beige-400">{description}</p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-beige-300/18 pt-4">
            <span className="text-xs uppercase tracking-[0.24em] text-beige-500">{episodes.length} memories</span>
            <span className="text-sm font-semibold text-beige-300 transition group-hover:text-beige-500">
              Open chapter
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
