import { useEffect, useMemo, useRef, useState } from 'react'

export function AudioControl() {
  const [playing, setPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const ctx = useMemo(() => {
    if (typeof window === 'undefined') return null
    return new AudioContext()
  }, [])

  useEffect(() => {
    audioContextRef.current = ctx
    return () => {
      oscillatorRef.current?.stop()
      audioContextRef.current?.close().catch(() => null)
    }
  }, [ctx])

  useEffect(() => {
    if (!audioContextRef.current) return
    if (playing) {
      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      osc.type = 'sine'
      osc.frequency.value = 220
      gain.gain.value = 0.01
      osc.connect(gain)
      gain.connect(audioContextRef.current.destination)
      osc.start()
      oscillatorRef.current = osc
      gainRef.current = gain
    } else {
      oscillatorRef.current?.stop()
      oscillatorRef.current = null
    }
  }, [playing])

  return (
    <button
      type="button"
      onClick={() => setPlaying((current) => !current)}
      className="inline-flex items-center gap-3 rounded-full border border-beige-300/20 bg-crimson-950/55 px-4 py-3 text-sm text-beige-300 shadow-lg shadow-crimson-950/30 backdrop-blur-xl transition hover:border-beige-600/60 hover:bg-crimson-800/70"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-crimson-300 shadow-[0_0_16px_rgba(255,0,0,0.45)]" />
      {playing ? 'Mute Music' : 'Play Soft Music'}
    </button>
  )
}
