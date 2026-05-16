import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MemoryGallery } from '../components/MemoryGallery'
import { FinalScene } from '../components/FinalScene'
import { episodes, getEpisode, seasons } from '../data/episodes'
import { useMemoryImages } from '../hooks/useMemoryImages'

const humanNotes = [
  'The day everything unknowingly began.',
  'They did not have everything yet, but they kept choosing each other.',
  'A small moment that later became family history.',
  'The kind of memory that stays soft even after years pass.',
  'Proof that love was being built quietly.',
  'A pause worth keeping.',
]

export function EpisodeDetail() {
  const { episodeId } = useParams()
  const navigate = useNavigate()
  const episode = episodeId ? getEpisode(episodeId) : null
  const heroImages = useMemoryImages(episode?.years ?? [], 3)
  const heroCover = heroImages[0]

  if (!episode) {
    return (
      <div className="paper-texture mt-20 rounded-sm p-10 text-center text-crimson-950 shadow-[0_30px_80px_rgba(45,0,0,0.28)]">
        <p className="text-sm uppercase tracking-[0.34em] text-crimson-700/60">Memory not found</p>
        <h2 className="mt-4 text-3xl font-serif text-crimson-950">That episode is still waiting in the archive.</h2>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-8 rounded-full bg-crimson-500 px-6 py-3 text-sm font-semibold text-beige-300 transition hover:bg-crimson-400"
        >
          Return to library
        </button>
      </div>
    )
  }

  const seasonId = seasons.find((season) => season.title.toUpperCase() === episode.season)?.id ?? ''
  const currentIndex = episodes.findIndex((item) => item.id === episode.id)
  const nextEpisode = episodes[currentIndex + 1]
  const memoryMoments = [...episode.highlights, ...(episode.timeline ?? [])]
  const chapterSubtitle =
    episode.id === '2005'
      ? 'The year two strangers unknowingly started building a forever.'
      : episode.description
  const continuationText =
    episode.id === '2005'
      ? 'And slowly, the first meeting became a promise. The promise became a home.'
      : 'And somewhere inside the ordinary days, another memory found its place.'

  return (
    <div className="relative overflow-hidden pb-32">
      <div className="absolute inset-x-[-10%] top-[-12rem] h-[42rem] bg-[radial-gradient(circle_at_20%_20%,rgba(197,166,126,0.22),transparent_32%),radial-gradient(circle_at_72%_18%,rgba(220,0,0,0.16),transparent_30%)] blur-3xl" />
      <div className="relative z-10 grid gap-32">
        <section className="relative left-1/2 min-h-[100svh] w-screen -translate-x-1/2 overflow-hidden bg-crimson-950">
          {heroCover ? (
            <>
              <img src={heroCover} alt="" className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-52" />
              <img src={heroCover} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-24 blur-2xl" />
            </>
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,4,5,0.96),rgba(45,0,0,0.64)_50%,rgba(92,0,0,0.2)),linear-gradient(180deg,rgba(8,4,5,0.24),rgba(45,0,0,0.28)_42%,rgba(45,0,0,0.98))]" />
          <div className="absolute inset-0 cinematic-vignette" />
          <div className="light-leak pointer-events-none absolute inset-[-10%] mix-blend-screen" />
          <div className="drifting-grain absolute inset-[-8%] opacity-[0.18] mix-blend-screen film-grain" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className="cinema-particle"
                style={{
                  left: `${(index * 17) % 100}%`,
                  top: `${12 + ((index * 23) % 74)}%`,
                  animationDelay: `${index * 0.35}s`,
                  animationDuration: `${7 + (index % 5)}s`,
                }}
              />
            ))}
          </div>
          <div className="relative flex min-h-[100svh] flex-col justify-between px-6 py-8 sm:px-10 lg:px-16">
            <Link
              to={seasonId ? `/season/${seasonId}` : '/'}
              className="w-fit rounded-full border border-beige-300/15 bg-crimson-950/35 px-4 py-2 text-xs uppercase tracking-[0.26em] text-beige-400 backdrop-blur transition hover:bg-beige-300/10"
            >
              Back to season
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="mb-12 max-w-5xl space-y-7"
            >
              <p className="text-sm uppercase tracking-[0.6em] text-beige-500">{episode.yearLabel}</p>
              <h1 className="max-w-5xl text-5xl font-serif font-semibold leading-[0.92] text-beige-300 drop-shadow-[0_18px_42px_rgba(45,0,0,0.65)] sm:text-7xl lg:text-8xl">
                {episode.title}
              </h1>
              <p className="max-w-2xl text-xl leading-9 text-beige-400 sm:text-2xl sm:leading-10">
                {chapterSubtitle}
              </p>
              <p className="handwritten max-w-xl text-2xl leading-9 text-beige-500">{humanNotes[0]}</p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-16 px-1 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-beige-600">Narration</p>
              <div className="h-px w-28 bg-beige-500/35" />
              <p className="handwritten max-w-xs text-2xl leading-9 text-beige-500">
                Some years are remembered by dates. Some are remembered by how the room felt.
              </p>
            </div>
          </aside>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.8 }}
            className="space-y-14"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.42em] text-beige-600">A narrated memory</p>
              <h2 className="max-w-4xl text-4xl font-serif leading-tight text-beige-300 sm:text-6xl">
                The chapter opens quietly, like an old photograph being lifted from an album.
              </h2>
            </div>
            <div className="grid gap-10">
              {episode.story.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={[
                    'max-w-4xl text-xl leading-10 text-beige-400 sm:text-2xl sm:leading-[3rem]',
                    index % 2 === 1 ? 'lg:ml-20' : '',
                  ].join(' ')}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-1 text-center">
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="handwritten mx-auto max-w-3xl text-4xl leading-tight text-beige-500 sm:text-5xl"
          >
            {continuationText}
          </motion.p>
        </section>

        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Pressed moments</p>
              <h2 className="max-w-3xl text-4xl font-serif leading-tight text-beige-300 sm:text-6xl">Small memories, kept with uneven edges.</h2>
            </div>
            <p className="text-sm uppercase tracking-[0.26em] text-beige-500">{episode.years.join(' + ')}</p>
          </div>
          <div className="cinema-perspective relative min-h-[34rem] columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {memoryMoments.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.62, delay: (index % 6) * 0.05 }}
                whileHover={{
                  y: -12,
                  rotate: 0,
                  rotateX: 2.5,
                  rotateY: index % 2 === 0 ? -3 : 3,
                  scale: 1.025,
                  transformPerspective: 900,
                }}
                className={[
                  'cinema-depth paper-texture relative mb-6 inline-block w-full break-inside-avoid overflow-hidden rounded-sm p-6 text-crimson-950 shadow-[0_28px_80px_rgba(45,0,0,0.24)]',
                  index % 3 === 1 ? 'lg:mt-12' : '',
                ].join(' ')}
              >
                <div className="absolute inset-0 opacity-25 film-grain" />
                <p className="relative text-xs uppercase tracking-[0.28em] text-crimson-700/55">note {String(index + 1).padStart(2, '0')}</p>
                <p className="relative mt-4 text-lg font-serif leading-8 text-crimson-950/86">{item}</p>
                <p className="handwritten relative mt-5 text-xl leading-7 text-crimson-700/78">{humanNotes[index % humanNotes.length]}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-6">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mb-10 space-y-3">
              <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Memory gallery</p>
              <h2 className="text-4xl font-serif leading-tight text-beige-300 sm:text-5xl">Photos from this chapter, layered like a film reel.</h2>
            </div>
            <MemoryGallery years={episode.years} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-1 py-10 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-4xl font-serif leading-tight text-beige-300 drop-shadow-[0_0_42px_rgba(197,166,126,0.2)] sm:text-6xl"
          >
            "{episode.quote}"
          </motion.blockquote>
        </section>
{episode.gratitudeMessage && (
  <div className="whitespace-pre-line">
    {episode.gratitudeMessage}
  </div>
)}
        {episode.endingText ? <FinalScene text={episode.endingText} /> : null}

        {nextEpisode ? (
          <section className="mx-auto w-full max-w-5xl border-t border-beige-300/15 pt-10">
            <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Next Chapter</p>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-serif leading-tight text-beige-300 sm:text-4xl">
                  {nextEpisode.yearLabel} - {nextEpisode.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-beige-400">{nextEpisode.description}</p>
              </div>
              <Link
                to={`/episode/${nextEpisode.id}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-beige-300 px-6 py-3 text-sm font-bold text-crimson-950 shadow-[0_18px_50px_rgba(197,166,126,0.18)] transition hover:bg-crimson-400 hover:text-beige-300"
              >
                Continue the story
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
