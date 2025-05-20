import { test } from '../fixtures/BasePage'
import * as path from 'node:path'
import * as invoice from '../pdf/Invoice'
import { renderInvoice } from '../pdf/Invoice'

test('Generate Invoice', async ({ page }) => {
  renderInvoice(invoice.invoice)
  const filePath = path.resolve(
    __dirname,
    '..',
    'pdf',
    'generated-invoice.html',
  )
  await page.goto(`file://${filePath}`)
  await new Promise((r) => setTimeout(r, 5000))

  const pdfPath = path.join('./test-results', 'invoice.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  })
})
