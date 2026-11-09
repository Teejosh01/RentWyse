import { brotliDecompressSync } from 'node:zlib'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import chromium from '@sparticuz/chromium'
import { chromium as playwright } from 'playwright-core'

// The package's "exports" map exposes only its entry point, so
// `require.resolve('@sparticuz/chromium/package.json')` throws
// ERR_PACKAGE_PATH_NOT_EXPORTED. Resolve the entry point instead and walk up to
// the directory that holds the bundled archives.
function chromiumPackageDirectory() {
  const require = createRequire(import.meta.url)
  let directory = dirname(require.resolve('@sparticuz/chromium'))
  while (!existsSync(join(directory, 'bin', 'al2023.tar.br'))) {
    const parent = dirname(directory)
    if (parent === directory) throw new Error('Could not locate the libraries bundled with @sparticuz/chromium.')
    directory = parent
  }
  return directory
}

// The npm-distributed browser keeps downloads on the npm registry. Its bundled
// Amazon Linux libraries also let the smoke tests run on a minimal Debian CI box.
export async function launchBrowser() {
  if (process.env.CHROMIUM_PATH) {
    return playwright.launch({ executablePath: process.env.CHROMIUM_PATH, headless: true, args: ['--no-sandbox'] })
  }

  const executablePath = await chromium.executablePath()
  const libraryDirectory = join(tmpdir(), 'al2023', 'lib')
  if (!existsSync(join(libraryDirectory, 'libnss3.so'))) {
    const packageDirectory = chromiumPackageDirectory()
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
