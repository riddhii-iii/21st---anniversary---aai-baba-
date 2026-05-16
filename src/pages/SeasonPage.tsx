import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EpisodeCard } from '../components/EpisodeCard'
import { getSeason } from '../data/episodes'
import { useMemoryImages } from '../hooks/useMemoryImages'

export function SeasonPage() {
  const { seasonId } = useParams()
  const navigate = useNavigate()
  const season = seasonId ? getSeason(seasonId) : null
  const coverYears = season?.episodes.flatMap((episode) => episode.years) ?? []
  const [cover] = useMemoryImages(coverYears, 1)

  if (!season) {
    return (
      <div className="paper-texture mt-20 rounded-sm p-10 text-center text-crimson-950 shadow-[0_30px_80px_rgba(45,0,0,0.28)]">
        <p className="text-sm uppercase tracking-[0.34em] text-crimson-700/60">Season not found</p>
        <h2 className="mt-4 text-3xl font-serif text-crimson-950">This season is not in the archive yet.</h2>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-8 rounded bg-beige-300 px-6 py-3 text-sm font-bold text-crimson-950 transition hover:bg-beige-400"
        >
          Return home
        </button>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden pb-20">
      <section className="relative -mx-4 min-h-[68vh] overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        {cover ? <img src={cover} alt="" className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-58" /> : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080405_0%,rgba(45,0,0,0.84)_42%,rgba(92,0,0,0.24)_100%),linear-gradient(180deg,rgba(8,4,5,0.5),#2d0000_100%)]" />
        <div className="absolute inset-0 cinematic-vignette" />
        <div className="light-leak pointer-events-none absolute inset-[-10%] mix-blend-screen" />
        <div className="drifting-grain pointer-events-none absolute inset-[-8%] opacity-[0.16] mix-blend-screen film-grain" />
        <div className="relative z-10 flex min-h-[68vh] flex-col justify-end gap-6 pb-16 pt-8">
          <Link to="/" className="w-fit rounded border border-beige-300/20 bg-crimson-950/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-beige-300/85 backdrop-blur transition hover:bg-beige-300/10">
            Back Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl"
          >
            <p className="handwritten text-3xl text-beige-500">{season.title}</p>
            <h1 className="mt-4 text-5xl font-serif leading-[0.95] text-beige-300 sm:text-6xl lg:text-8xl">
              {season.subtitle}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-beige-400">{season.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mt-16 grid gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Memory chapters</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-serif leading-tight text-beige-300 sm:text-5xl">
              Open the year that calls you back.
            </h2>
          </div>
          <span className="text-sm text-beige-500">{season.episodes.length} chapters</span>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {season.episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </div>
  )
}
