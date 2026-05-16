import { useEffect, useRef, useState } from 'react'

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio('/music/song.mp3')

    audio.loop = true
    audio.volume = 0.4
    audio.preload = 'auto'

    audioRef.current = audio

    return () => {
      audio.pause()
    }
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (playing) {
        audioRef.current.pause()
        setPlaying(false)
      } else {
        await audioRef.current.play()
        setPlaying(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        type="button"
        onClick={toggleMusic}
        className="rounded-full border border-white/20 bg-black/40 px-5 py-3 text-white backdrop-blur-md"
      >
        {playing ? 'Mute Music' : 'Play Soft Music'}
      </button>
    </div>
  )
}