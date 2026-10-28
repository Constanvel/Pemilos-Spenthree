import fs from 'node:fs'
import crypto from 'node:crypto'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as icons from 'lucide-react'
import { expect, test } from '@playwright/test'

const referenceRoot = new URL('../reference/frontend/', import.meta.url)
const read = (path) => fs.readFileSync(new URL(path, referenceRoot), 'utf8')
const logo = fs.readFileSync(new URL('assets/logo-sekolah-1.png', referenceRoot))
const css = read('src/styles.css')
// The supplied fragment has replacement characters at middle-dot separators.
// Normalize those separators only; preserve all original reference files on disk.
const markup = read('src/ui.html').replaceAll('\uFFFD', '·')
  .replace('../assets/logo-sekolah-1.png', `data:image/png;base64,${logo.toString('base64')}`)
  .replace(/<i data-lucide="([^"]+)" aria-hidden="true"><\/i>/g, (_, name) => {
    const component = icons[name.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')]
    if (!component) throw new Error(`Unknown reference icon: ${name}`)
    return renderToStaticMarkup(createElement(component, { 'aria-hidden': 'true' }))
  })

async function openReference(page) {
  // Render only the product fragment. Never execute the unrelated host wrapper.
  await page.setContent(`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>:root{color-scheme:light dark;font-family:Arial,Helvetica,sans-serif;background:light-dark(#fff,#121212)}body{margin:0}${css}</style></head><body>${markup}</body></html>`)
  await page.addScriptTag({ content: read('src/app.js') })
}

async function show(page, screen) {
  if (screen === 'home') return
  if (screen === 'guide') {
    await page.getByRole('button', { name: 'Panduan', exact: true }).click()
    return
  }
  await page.getByRole('button', { name: 'Mulai memilih' }).click()
  if (screen === 'access') return
  await page.getByRole('button', { name: 'Gunakan kode demo' }).click()
  await page.getByRole('button', { name: 'Buka surat suara' }).click()
  if (screen === 'ballot') return
  await page.locator('[data-profile]').first().click()
  if (screen === 'profile') return
  await page.getByRole('button', { name: 'Pilih kandidat ini' }).click()
  await page.getByRole('button', { name: 'Lanjutkan' }).click()
  if (screen === 'confirm') return
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Kirim suara', exact: true }).click()
}

async function geometry(page) {
  return page.locator('#pv-app').evaluate((app) => {
    const bounds = app.getBoundingClientRect()
    const selectors = ['.head', '.head img', '.brand', '.badge', '.page:not([hidden])', '.page:not([hidden]) h1', '.page:not([hidden]) h2', '.page:not([hidden]) h3', '.page:not([hidden]) .desc', '.hero', '.note', '.process', '.candidate', '.profile-top', '.box', '.receipt', '.page:not([hidden]) button', '.page:not([hidden]) input', '.page:not([hidden]) details', 'nav', '.demo-footer']
    return Object.fromEntries(selectors.map((selector) => [selector, [...app.querySelectorAll(selector)].filter((element) => element.getClientRects().length).map((element) => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return {
        text: element.matches('img, input') ? '' : element.textContent.replace(/\s+/g, ''),
        x: Math.round((rect.x - bounds.x) * 10) / 10,
        y: Math.round((rect.y - bounds.y) * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        font: style.fontSize, color: style.color, background: style.backgroundColor,
      }
    })]))
  })
}

for (const width of [320, 390]) {
  for (const screen of ['home', 'access', 'ballot', 'profile', 'confirm', 'success', 'guide']) {
    test(`handover parity ${screen} at ${width}px`, async ({ page, context }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 })
      const reference = await context.newPage()
      await reference.setViewportSize({ width, height: 1000 })
      await openReference(reference)
      await page.goto('/')
      await show(reference, screen)
      await show(page, screen)
      await expect(page.locator(`.page[data-screen="${screen}"]`)).toBeVisible()
      await expect(page.locator('.head img')).toHaveJSProperty('naturalWidth', 920)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const actual = await geometry(page)
      const expected = await geometry(reference)
      try {
        expect(actual).toEqual(expected)
        await page.locator('#pv-app').screenshot({ path: testInfo.outputPath('react.png') })
        await reference.locator('#pv-app').screenshot({ path: testInfo.outputPath('handover.png') })
      } catch (error) {
        await testInfo.attach('react', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' })
        await testInfo.attach('handover', { body: await reference.screenshot({ fullPage: true }), contentType: 'image/png' })
        throw error
      } finally {
        await reference.close()
      }
    })
  }
}

test('original source and imported logo retain their exact hashes', () => {
  const hash = (data) => crypto.createHash('sha256').update(data).digest('hex')
  expect(hash(fs.readFileSync(new URL('index.html', referenceRoot)))).toBe('1079a78b8f6f41999573d9ac8b472772161452ccc52910cd627ec90eebfcdb15')
  expect(hash(logo)).toBe('b6fea6c2f424a71e8224e70a39533a19ce58a98551e7802c79def755a913ee56')
  expect(hash(fs.readFileSync(new URL('../src/assets/logo-sekolah-1.png', import.meta.url)))).toBe(hash(logo))
})

test('FAQ opens with keyboard and preserves the first expanded answer', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Panduan' }).click()
  const summary = page.getByText('Apakah pilihan bisa diubah?', { exact: true })
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(summary.locator('..')).toHaveAttribute('open', '')
  await expect(page.getByText('Bagaimana cara memberikan suara?', { exact: true }).locator('..')).toHaveAttribute('open', '')
})
