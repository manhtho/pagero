import { test } from '../fixtures/BasePage'
import * as path from 'node:path'

test('Generate Invoice', async ({ page }) => {
  await page.goto('http://localhost:3000/invoice')
  await new Promise((r) => setTimeout(r, 5000))

  const pdfPath = path.join('./test-results', 'invoice.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  })
  console.log('PDF saved to:', pdfPath)
})
