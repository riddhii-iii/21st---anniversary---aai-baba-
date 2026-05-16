import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { AudioControl } from '../components/AudioControl'
import { SeasonPosterCard } from '../components/SeasonPosterCard'
import { episodes, episodesBySeason } from '../data/episodes'
import { useMemoryImages } from '../hooks/useMemoryImages'

const openingNotes = [
  '13 February 2005. Yavatmal. One meeting that quietly changed everything.',
  'They did not know it then, but an ordinary conversation was becoming a lifetime.',
  'This archive holds the little pauses, brave beginnings, family dreams, and soft victories that made 21 years feel alive.',
]

const memoryCaptions = [
  'The day everything unknowingly began.',
  'Small photographs. Big feelings.',
  'A little proof that time was kind.',
  'A memory still warm at the edges.',
]

export function Home() {
  const heroEpisode = useMemo(() => episodes[0], [])
  const heroImages = useMemoryImages(heroEpisode.years, 7)
  const heroCover = heroImages[0]
  const previewImages = heroImages.slice(1, 6)

  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-20 flex flex-col gap-24 pb-24">
        <header className="relative -mx-4 min-h-[92vh] overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          {heroCover ? (
            <>
              <img src={heroCover} alt="" className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-70" />
              <img src={heroCover} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl" />
            </>
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#080405_0%,rgba(45,0,0,0.86)_34%,rgba(92,0,0,0.28)_70%,rgba(8,4,5,0.88)_100%),linear-gradient(180deg,rgba(8,4,5,0.72)_0%,rgba(45,0,0,0.08)_35%,#2d0000_100%)]" />
          <div className="absolute inset-0 cinematic-vignette" />
          <div className="light-leak pointer-events-none absolute inset-[-10%] mix-blend-screen" />
          <div className="drifting-grain pointer-events-none absolute inset-[-8%] opacity-[0.18] mix-blend-screen film-grain" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className="cinema-particle"
                style={{
                  left: `${(index * 29) % 100}%`,
                  top: `${8 + ((index * 19) % 82)}%`,
                  animationDelay: `${index * 0.42}s`,
                  animationDuration: `${9 + (index % 6)}s`,
                }}
              />
            ))}
          </div>

          <nav className="relative z-10 flex items-center justify-between py-6">
            <div className="flex items-center gap-8">
              <span className="handwritten text-2xl text-beige-300/90 drop-shadow-[0_0_20px_rgba(197,166,126,0.28)]">
                Pravin & Anjali
              </span>
              <div className="hidden items-center gap-5 text-sm font-medium text-beige-300/80 md:flex">
                <a href="#seasons" className="transition hover:text-beige-300">Home</a>
                <a href="#seasons" className="transition hover:text-beige-300">Seasons</a>
                <a href="#letter" className="transition hover:text-beige-300">Memories</a>
                <Link to="/episode/2025-2026" className="transition hover:text-beige-300">Finale</Link>
              </div>
            </div>
            
          </nav>

          <div className="relative z-10 grid min-h-[calc(92vh-96px)] items-center gap-12 pb-28 pt-10 lg:grid-cols-[minmax(0,1fr)_28rem]">
            <div className="max-w-5xl space-y-7">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-semibold uppercase tracking-[0.34em] text-beige-500"
              >
                A memory archive | 21 years in motion
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-7"
              >
                <h1 className="max-w-5xl text-6xl font-serif font-semibold leading-[0.92] text-beige-300 drop-shadow-[0_10px_44px_rgba(45,0,0,0.82)] sm:text-7xl lg:text-9xl">
                  The Story of Us
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-beige-300/80">
                  <span>2005-2026</span>
                  <span className="border border-beige-300/45 px-1.5 py-0.5 text-xs">21+</span>
                  <span>Love, family, work, dreams</span>
                </div>
                <p className="max-w-2xl text-xl leading-9 text-beige-300 sm:text-2xl sm:leading-10">
                  On 13 February 2005, two strangers met at a Vadhuvar Parichay Melava in Yavatmal.
                  Neither of them knew that one conversation would someday become an entire lifetime.
                </p>
                <p className="handwritten max-w-xl text-2xl leading-9 text-beige-500">
                  And slowly... two strangers became home.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/episode/${heroEpisode.id}`}
                    className="inline-flex items-center justify-center gap-3 rounded bg-beige-300 px-7 py-3 text-base font-bold text-crimson-950 shadow-[0_20px_60px_rgba(45,0,0,0.45)] transition hover:bg-beige-400"
                  >
                    Begin the film
                  </Link>
                  <a
                    href="#letter"
                    className="inline-flex items-center justify-center rounded bg-beige-300/20 px-7 py-3 text-base font-bold text-beige-300 backdrop-blur transition hover:bg-beige-300/30"
                  >
                    Read the note
                  </a>
                </div>
              </motion.div>
            </div>

            {previewImages.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 26, rotate: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="cinema-perspective relative hidden min-h-[34rem] lg:block"
              >
                {previewImages.slice(0, 4).map((image, index) => (
                  <motion.div
                    key={image}
                    animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                    transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{
                      y: -16,
                      rotate: 0,
                      rotateX: 4,
                      rotateY: index % 2 === 0 ? -5 : 5,
                      scale: 1.04,
                      transformPerspective: 900,
                    }}
                    className={[
                      'cinema-depth photo-frame absolute w-56 overflow-hidden rounded-sm shadow-[0_26px_70px_rgba(20,0,0,0.42)]',
                      index === 0 ? 'left-8 top-6 rotate-[-6deg]' : '',
                      index === 1 ? 'right-4 top-24 rotate-[7deg]' : '',
                      index === 2 ? 'bottom-8 left-0 rotate-[4deg]' : '',
                      index === 3 ? 'bottom-0 right-12 rotate-[-5deg]' : '',
                    ].join(' ')}
                  >
                    <Link to={`/episode/${heroEpisode.id}`} className="group block">
                      <img src={image} alt="" className="h-64 w-full object-cover sepia-[0.18] transition duration-700 group-hover:scale-105" />
                      <p className="handwritten bg-beige-300 px-3 py-3 text-lg leading-6 text-crimson-950">
                        {memoryCaptions[index]}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </div>
        </header>

        <section id="letter" className="relative mx-auto grid max-w-6xl gap-12 px-1 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="paper-texture relative overflow-hidden rounded-sm p-8 text-crimson-950 shadow-[0_34px_100px_rgba(45,0,0,0.28)] sm:p-12"
          >
            <div className="absolute inset-0 opacity-25 film-grain" />
            <p className="handwritten relative text-2xl text-crimson-700">A note from the first chapter</p>
            <div className="relative mt-8 space-y-6 text-lg leading-9 text-crimson-950/82">
              {openingNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.42em] text-beige-600">Before the seasons</p>
            <h2 className="max-w-3xl text-5xl font-serif leading-[1.02] text-beige-300 sm:text-6xl">
              This is not a timeline. It is a house full of remembered light.
            </h2>
            <p className="max-w-2xl text-lg leading-9 text-beige-400">
              Every year opens like a room: some filled with struggle, some with laughter, some with prayers,
              some with photographs that still feel warm in the hand.
            </p>
          </div>
        </section>

        <section id="seasons" className="grid scroll-mt-8 gap-10">
          <div className="mx-auto max-w-5xl space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.42em] text-beige-600">The archive</p>
            <h2 className="text-4xl font-serif leading-tight text-beige-300 sm:text-6xl">
              Four seasons of becoming.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-beige-400">
              Choose a chapter when you are ready. Each one carries a different temperature of love.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {episodesBySeason.map((season) => (
              <SeasonPosterCard
                key={season.id}
                id={season.id}
                title={season.title}
                subtitle={season.subtitle}
                description={season.description}
                episodes={season.episodes}
              />
            ))}
          </div>
        </section>

        <footer className="paper-texture rounded-sm p-8 text-crimson-950 shadow-[0_40px_100px_rgba(45,0,0,0.24)] sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="handwritten text-2xl text-crimson-700">Still being written</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-crimson-950/72">
                A living memory archive for 21 years of choosing, building, forgiving, laughing, and coming home.
              </p>
            </div>
            <Link
              to="/episode/2025-2026"
              className="inline-flex items-center justify-center rounded-full bg-crimson-700 px-5 py-3 text-sm font-semibold text-beige-300 shadow-[0_18px_45px_rgba(92,0,0,0.25)] transition hover:bg-crimson-500"
            >
              See the final scene
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
