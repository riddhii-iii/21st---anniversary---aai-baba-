import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMemoryImages } from '../hooks/useMemoryImages'

type MemoryGalleryProps = {
  years: string[]
}

const fallbackImage = '/memories/placeholder.svg'
const galleryCaptions = [
  'held close',
  'a soft pause',
  'kept forever',
  'home, in one frame',
  'small joy',
  'still glowing',
]

export function MemoryGallery({ years }: MemoryGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const images = useMemoryImages(years)
  const visibleImages = images.length > 0 ? images : [fallbackImage, fallbackImage, fallbackImage]

  return (
    <>
      <div className="relative min-h-[34rem] columns-1 gap-7 space-y-7 sm:columns-2 lg:columns-3">
        <div className="light-leak pointer-events-none absolute inset-[-8%] opacity-35 mix-blend-screen" />
        {visibleImages.map((src, index) => (
          <motion.button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveImage(src)}
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.4 : 1.4 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: (index % 6) * 0.06 }}
            whileHover={{
              y: -14,
              scale: 1.035,
              rotate: 0,
              rotateX: 3,
              rotateY: index % 2 === 0 ? -4 : 4,
              transformPerspective: 1000,
            }}
            className={[
              'photo-frame group relative mb-7 inline-block w-full break-inside-avoid overflow-hidden rounded-sm text-left shadow-[0_34px_90px_rgba(45,0,0,0.34)]',
              index % 5 === 1 ? 'lg:mt-14' : '',
              index % 5 === 3 ? 'sm:mt-10' : '',
            ].join(' ')}
          >
            <div className="relative overflow-hidden rounded-[0.15rem]">
              <img
                src={src}
                alt={`Memory from ${years.join(', ')}`}
                loading="lazy"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = fallbackImage
                }}
                className={[
                  'w-full object-cover sepia-[0.16] transition duration-1000 group-hover:scale-110',
                  index % 7 === 0 || index % 7 === 3 ? 'h-[32rem]' : index % 3 === 1 ? 'h-72' : 'h-80',
                ].join(' ')}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,240,229,0.1),transparent_32%,rgba(45,0,0,0.68))]" />
              <div className="pointer-events-none absolute inset-0 opacity-20 film-grain" />
            </div>
            <div className="bg-beige-300 px-4 py-3">
              <p className="handwritten text-xl leading-6 text-crimson-800">{galleryCaptions[index % galleryCaptions.length]}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-crimson-950/45">{years.join(' / ')}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {activeImage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-[#080405]/92 p-4 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full bg-beige-300 px-4 py-2 text-sm font-bold text-crimson-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
            onClick={() => setActiveImage(null)}
          >
            Close
          </button>
          <motion.img
            src={activeImage}
            alt="Selected memory"
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="max-h-[86vh] max-w-[92vw] rounded-sm border-[0.65rem] border-beige-300 object-contain shadow-[0_40px_140px_rgba(0,0,0,0.78)]"
          />
        </motion.div>
      ) : null}
    </>
  )
}
