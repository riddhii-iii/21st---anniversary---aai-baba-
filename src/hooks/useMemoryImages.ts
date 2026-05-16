import { useEffect, useMemo, useState } from 'react'

type MemoryManifest = Record<string, string[]>

let manifestPromise: Promise<MemoryManifest> | null = null

function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('/memories/manifest.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load memory manifest')
        return response.json() as Promise<MemoryManifest>
      })
      .catch(() => ({}))
  }

  return manifestPromise
}

export function useMemoryImages(years: string[], limit?: number) {
  const [manifest, setManifest] = useState<MemoryManifest>({})

  useEffect(() => {
    let mounted = true

    loadManifest().then((nextManifest) => {
      if (mounted) setManifest(nextManifest)
    })

    return () => {
      mounted = false
    }
  }, [])

  return useMemo(() => {
    const images = years.flatMap((year) => manifest[year] ?? [])
    return typeof limit === 'number' ? images.slice(0, limit) : images
  }, [limit, manifest, years])
}
