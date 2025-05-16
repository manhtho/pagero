import { test, expect } from '../fixtures/BasePage'
import { config } from '../import.config'
import { getInvoice } from '../types/Invoice'

test('Import Invoice', async ({
  loginPage,
  headerBar,
  leftSideBar,
  createInvoicePage,
}) => {
  const invoice = getInvoice()

  await test.step('1. Přihlášení a přechod na Create invoice', async () => {
    const credentials = config.credentials
    await loginPage.login(credentials.username, credentials.password)
    await expect(headerBar.loggedInLabel).toBeVisible()
    await leftSideBar.navigateTo('Create invoice')
  })

  await test.step('2. Výběr šablony', async () => {
    await createInvoicePage.createInvoiceFromTemplate()
  })

  await test.step('3. Vyplnění formuláře Invoice Details', async () => {
    await createInvoicePage.fillInvoiceDetails(invoice)
  })

  await test.step('3. Vyplnění Article Quantity (počet man days)', async () => {
    await createInvoicePage.setArticleQuantity(invoice.manDays)
  })

  await test.step('4. Přidat příloha', async () => {
    await createInvoicePage.addAttachment('')
    console.log('Nahraj fakturu')
  })
})
