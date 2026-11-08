import assert from 'node:assert/strict'
import { mkdirSync, readFileSync } from 'node:fs'
import axe from 'axe-core'
import { launchBrowser } from './browser.mjs'

const baseUrl = process.env.TEST_URL ?? 'http://127.0.0.1:5173'
const approved = JSON.parse(readFileSync(new URL('./approved-content.json', import.meta.url), 'utf8'))
const widths = [1440, 1280, 1024, 834, 768, 600, 430, 390, 375, 320]
const normalize = (text) => text.replace(/\s+/g, ' ').trim()
const errors = []
const browser = await launchBrowser()
mkdirSync('screenshots', { recursive: true })

function expectedSectionText(section) {
  return normalize([
    section.number === '01' || section.number === '08' ? '' : section.label,
    section.heading,
    section.description,
    ...section.bullets,
    section.note ?? '',
    ...section.ctas,
  ].join(' '))
}

async function visibleSectionText(page, id) {
  return page.locator(`section#${id}`).evaluate((element) => {
    // Read layout-aware visible text, excluding decorative illustration labels.
    // The approved em-dash separator is visual punctuation and stays in the audit.
    const decorative = [...element.querySelectorAll('[aria-hidden="true"]')].filter((node) => !node.classList.contains('feature-dash'))
    const previous = decorative.map((node) => node.style.display)
    decorative.forEach((node) => { node.style.display = 'none' })
    const text = element.innerText
    decorative.forEach((node, index) => { node.style.display = previous[index] })
    return text
  })
}

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
    page.on('pageerror', (error) => errors.push(`${width}px page error: ${error.message}`))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`${width}px console: ${message.text()}`) })
    page.on('requestfailed', (request) => errors.push(`${width}px request: ${request.url()} ${request.failure()?.errorText}`))
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const cleanUrl = page.url().split('#')[0]

    assert.equal(await page.locator('main > section').count(), 8, `${width}px: eight homepage sections`)
    assert.equal(await page.locator('h1').count(), 1, `${width}px: one primary heading`)
    assert.deepEqual(await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.id)), approved.map((section) => section.id))

    const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }))
    assert.ok(dimensions.document <= dimensions.viewport + 1, `${width}px: document overflow ${JSON.stringify(dimensions)}`)
    assert.ok(dimensions.body <= dimensions.viewport + 1, `${width}px: body overflow ${JSON.stringify(dimensions)}`)

    for (const section of approved) {
      const actual = normalize(await visibleSectionText(page, section.id))
      assert.equal(actual, expectedSectionText(section), `${width}px: locked copy in ${section.id}`)
    }

    const brokenAnchors = await page.locator('a[href]').evaluateAll((links) => links.filter((link) => {
      const href = link.getAttribute('href')
      return !href?.startsWith('#') || !document.getElementById(href.slice(1))
    }).map((link) => link.getAttribute('href')))
    assert.deepEqual(brokenAnchors, [], `${width}px: every link resolves on this page`)

    const smallActions = await page.locator('.action:visible').evaluateAll((links) => links.filter((link) => link.getBoundingClientRect().height < 44).map((link) => ({ text: link.textContent, height: link.getBoundingClientRect().height })))
    assert.deepEqual(smallActions, [], `${width}px: comfortable CTA tap targets`)

    if (width <= 1100) {
      const toggle = page.getByRole('button', { name: 'Open navigation' })
      await toggle.click()
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Escape')
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false')
      assert.equal(await page.locator('#mobile-navigation').isVisible(), false)
      await toggle.click()
      await page.locator('#mobile-navigation').getByRole('link', { name: 'RENT SAVINGS', exact: true }).click()
      assert.equal(await page.locator('#mobile-navigation').isVisible(), false)
      assert.ok(page.url().endsWith('#rent-savings'))
      await page.waitForFunction(() => {
        const top = document.getElementById('rent-savings').getBoundingClientRect().top
        return top >= 68 && top <= 140
      }, null, { timeout: 5000 })
      const targetTop = await page.locator('#rent-savings').evaluate((element) => element.getBoundingClientRect().top)
      assert.ok(targetTop >= 68 && targetTop <= 140, `${width}px: anchor clears sticky header (${targetTop})`)
    } else {
      await page.locator('.desktop-nav').getByRole('link', { name: 'FOR LANDLORDS', exact: true }).click()
      assert.ok(page.url().endsWith('#for-landlords'))
      await page.waitForFunction(() => {
        const top = document.getElementById('for-landlords').getBoundingClientRect().top
        return top >= 80 && top <= 140
      }, null, { timeout: 5000 })
      const targetTop = await page.locator('#for-landlords').evaluate((element) => element.getBoundingClientRect().top)
      assert.ok(targetTop >= 80 && targetTop <= 140, `${width}px: anchor clears sticky header (${targetTop})`)
    }

    await page.evaluate((url) => { window.history.replaceState(null, '', url); window.scrollTo({ top: 0, behavior: 'instant' }) }, cleanUrl)
    await page.waitForTimeout(100)
    if ([1440, 834, 390].includes(width)) {
      await page.screenshot({ path: `screenshots/homepage-${width}.png`, fullPage: true })
      await page.screenshot({ path: `screenshots/hero-${width}.png` })
    }
    console.log(`✓ ${width}px: copy, section order, overflow, anchors, tap targets${width <= 1100 ? ', mobile navigation' : ''}`)
    await page.close()
  }

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  await reduced.goto(baseUrl, { waitUntil: 'networkidle' })
  assert.equal(await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto')
  await reduced.close()

  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(axe.source)
    const results = await page.evaluate(async () => window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    }))
    assert.deepEqual(results.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.target) })), [], `${width}px: accessibility scan`)
    await page.close()
    console.log(`✓ ${width}px: axe WCAG A/AA and best-practice scan`)
  }

  assert.deepEqual(errors, [], 'No browser errors or failed assets')
  console.log('✓ Reduced motion; no browser errors or failed assets')
  console.log('All homepage checks passed.')
} finally {
  await browser.close()
}
