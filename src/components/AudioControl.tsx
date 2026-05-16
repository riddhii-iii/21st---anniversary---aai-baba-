import { useEffect, useRef, useState } from 'react'

export function AudioControl() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/music/song.mp3')

    audio.loop = true
    audio.volume = 0.4

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
      } else {
        await audioRef.current.play()
      }

      setPlaying(!playing)
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className="inline-flex items-center gap-3 rounded-full border border-beige-300/20 bg-crimson-950/55 px-4 py-3 text-sm text-beige-300 shadow-lg shadow-crimson-950/30 backdrop-blur-xl transition hover:border-beige-600/60 hover:bg-crimson-800/70"
    >
      {playing ? 'Mute Music' : 'Play Soft Music'}
    </button>
  )
}