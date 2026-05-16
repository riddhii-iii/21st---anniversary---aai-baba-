import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const memoriesDir = path.join(root, 'public', 'memories')
const manifestPath = path.join(memoriesDir, 'manifest.json')
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])

async function listImages(dir, baseUrl) {
  const entries = await readdir(dir, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    const entryUrl = `${baseUrl}/${encodeURIComponent(entry.name)}`

    if (entry.isDirectory()) {
      images.push(...(await listImages(entryPath, entryUrl)))
    } else if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryUrl)
    }
  }

  return images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

async function main() {
  const entries = await readdir(memoriesDir, { withFileTypes: true })
  const manifest = {}

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    manifest[entry.name] = await listImages(path.join(memoriesDir, entry.name), `/memories/${entry.name}`)
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Generated ${path.relative(root, manifestPath)} with ${Object.keys(manifest).length} year folders.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
