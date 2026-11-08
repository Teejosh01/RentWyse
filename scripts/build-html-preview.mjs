import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { join, dirname, extname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const temporaryOutput = join(root, '.preview-build')
const finalFile = join(root, 'RentWyse-Homepage-Preview.html')

const mimeTypes = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
}

function localAssetPath(outputDirectory, url) {
  if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('data:')) return null
  const cleanUrl = url.split('?')[0].split('#')[0].replace(/^\.\//, '')
  const assetPath = resolve(outputDirectory, cleanUrl)
  const rel = relative(outputDirectory, assetPath)
  if (rel.startsWith('..') || resolve(rel) === rel) throw new Error(`Unsafe asset path: ${url}`)
  return assetPath
}

function dataUrl(path) {
  const mime = mimeTypes[extname(path).toLowerCase()] ?? 'application/octet-stream'
  return `data:${mime};base64,${readFileSync(path).toString('base64')}`
}

function inlineCssAssets(css, cssDirectory) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, _quote, url) => {
    const path = localAssetPath(cssDirectory, url.trim())
    return path ? `url("${dataUrl(path)}")` : match
  })
}

mkdirSync(temporaryOutput, { recursive: true })

try {
  await build({
    configFile: join(root, 'vite.config.ts'),
    root,
    base: './',
    logLevel: 'warn',
    build: {
      outDir: temporaryOutput,
      emptyOutDir: true,
      sourcemap: false,
    },
  })

  let html = readFileSync(join(temporaryOutput, 'index.html'), 'utf8')

  // Inline the entry script so Chrome does not need a local web server or module fetches.
  html = html.replace(/<script\b([^>]*)\bsrc=['"]([^'"]+)['"]([^>]*)><\/script>/gi, (match, before, src) => {
    const path = localAssetPath(temporaryOutput, src)
    if (!path) return match
    const code = readFileSync(path, 'utf8').replace(/<\/script/gi, '<\\/script')
    return `<script type="module">${code}</script>`
  })

  // Inline styles, fonts and the favicon into the same downloadable document.
  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\bhref=['"]([^'"]+)['"]/i)?.[1]
    if (!href) return tag
    const path = localAssetPath(temporaryOutput, href)
    if (!path) return tag
    if (/\brel=['"]stylesheet['"]/i.test(tag)) {
      return `<style>${inlineCssAssets(readFileSync(path, 'utf8'), dirname(path))}</style>`
    }
    if (/\brel=['"]modulepreload['"]/i.test(tag)) return ''
    return tag.replace(href, dataUrl(path))
  })

  if (/(?:src|href)=['"]\.?\/?assets\//i.test(html) || /<link\b[^>]*rel=['"]stylesheet['"]/i.test(html)) {
    throw new Error('The standalone preview still references an external build asset.')
  }

  html = html.replace('<!doctype html>', '<!doctype html>\n<!-- Standalone RentWyse homepage preview. Open directly in Chrome; no server required. -->')
  writeFileSync(finalFile, html)
  console.log(`Created ${relative(root, finalFile)} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`)
} finally {
  rmSync(temporaryOutput, { recursive: true, force: true })
}
