import { test, expect } from '@playwright/test';
import { E2E_PORT, prettifyHTML } from '../utils'

test('typing plain text in the editor', async ({page}) => {
  await page.goto(`http://localhost:${E2E_PORT}/lexical-anchorpoint/`)
  const editor = page.locator('div[contenteditable=true]').first()
  await editor.focus()
  await page.keyboard.type('hello world')
  const html = await page.locator('div[contenteditable=true]').first().innerHTML()
  const expectedHtml = (`
    <p dir="ltr">
      <span data-lexical-text="true">hello world</span>
    </p>
  `)

  const expected = await prettifyHTML(expectedHtml.replace(/\n/gm, ''))
  const actual = await prettifyHTML(html.replace(/\n/gm, ''))
  expect(actual).toEqual(expected)
})

test('typing links into the editor', async ({page}) => {
  await page.goto(`http://localhost:${E2E_PORT}/lexical-anchorpoint/`)
  const editor = page.locator('div[contenteditable=true]').first()
  await editor.focus()
  await page.keyboard.type(
    'Hello http://example.com and https://example.com/path?with=query#and-hash and www.example.com'
  )

  const html = await page.locator('div[contenteditable=true]').first().innerHTML()

  const expectedHtml = `
  <p dir="ltr">
    <span data-lexical-text="true">Hello</span>
    <a href="http://example.com" dir="ltr">
      <span data-lexical-text="true">http://example.com</span>
    </a>
    <span data-lexical-text="true">and</span>
    <a href="https://example.com/path?with=query#and-hash" dir="ltr">
      <span data-lexical-text="true">https://example.com/path?with=query#and-hash</span>
    </a>
    <span data-lexical-text="true">and</span>
    <a href="https://www.example.com" dir="ltr">
      <span data-lexical-text="true">www.example.com</span>
    </a>
  </p>
  `

  const expected = await prettifyHTML(expectedHtml.replace(/\n/gm, ''))
  const actual = await prettifyHTML(html.replace(/\n/gm, ''))
  expect(actual).toEqual(expected)
})

test('appending to URL when text content is not URL content', async ({page}) => {
  await page.goto(`http://localhost:${E2E_PORT}/lexical-anchorpoint/`)
  const editor = page.locator('div[contenteditable=true]').first()
  await editor.focus()

  await page.keyboard.type('http://example.com')
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.type(' ')
  await page.keyboard.press('ArrowRight');
  await page.keyboard.type('. More text.')

  const html = await page.locator('div[contenteditable=true]').first().innerHTML()

  const expectedHtml = `
  <p dir="ltr">
    <a href="http://example.com" dir="ltr">
      <span data-lexical-text="true">http://example.co m</span>
    </a>
    <span data-lexical-text="true">. More text.</span>
  </p>
  `

  const expected = await prettifyHTML(expectedHtml.replace(/\n/gm, ''))
  const actual = await prettifyHTML(html.replace(/\n/gm, ''))
  expect(actual).toEqual(expected)
})