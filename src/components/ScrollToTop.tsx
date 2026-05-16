import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      timeoutRef.current = window.setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }, 80)
    })

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  return null
}
