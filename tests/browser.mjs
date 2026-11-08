import { brotliDecompressSync } from 'node:zlib'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import chromium from '@sparticuz/chromium'
import { chromium as playwright } from 'playwright-core'

// The npm-distributed browser keeps downloads on the npm registry. Its bundled
// Amazon Linux libraries also let the smoke tests run on a minimal Debian CI box.
export async function launchBrowser() {
  if (process.env.CHROMIUM_PATH) {
    return playwright.launch({ executablePath: process.env.CHROMIUM_PATH, headless: true, args: ['--no-sandbox'] })
  }

  const executablePath = await chromium.executablePath()
  const libraryDirectory = join(tmpdir(), 'al2023', 'lib')
  if (!existsSync(join(libraryDirectory, 'libnss3.so'))) {
    const require = createRequire(import.meta.url)
    const packageDirectory = dirname(require.resolve('@sparticuz/chromium/package.json'))
    const archive = join(tmpdir(), 'rentwyse-al2023.tar')
    const destination = join(tmpdir(), 'al2023')
    writeFileSync(archive, brotliDecompressSync(readFileSync(join(packageDirectory, 'bin', 'al2023.tar.br'))))
    mkdirSync(destination, { recursive: true })
    execFileSync('tar', ['-xf', archive, '-C', destination])
  }

  return playwright.launch({
    executablePath,
    args: [...chromium.args.filter((argument) => argument !== '--single-process'), '--disable-gpu'],
    headless: true,
    env: { ...process.env, LD_LIBRARY_PATH: `${libraryDirectory}:${process.env.LD_LIBRARY_PATH ?? ''}` },
  })
}
