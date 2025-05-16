import { expect, Locator, Page } from '@playwright/test'
import { Invoice } from '../types/Invoice'

export class CreateInvoicePage {
  private readonly tableRows: Locator
  private readonly createInvoiceFromTemplateButton: Locator
  private readonly invoiceNumberInput: Locator
  private readonly purchaseOrderNumberInput: Locator
  private readonly invoiceDateInput: Locator
  private readonly paymentTermsInput: Locator
  private readonly dueDateInput: Locator
  private readonly agreementIdInput: Locator
  private readonly ocrInput: Locator
  private readonly projectNumberInput: Locator
  private readonly invoicePeriodFromInput: Locator
  private readonly invoicePeriodToInput: Locator
  private readonly deliveryDateInput: Locator
  private readonly quantityInput: Locator
  private readonly addAttachmentButton: Locator
  readonly sendButton: Locator

  constructor(public readonly page: Page) {
    this.tableRows = page.locator(
      'pag-card[aria-label="Templates"] table tbody tr',
    )
    this.createInvoiceFromTemplateButton = page.locator(
      'pag-button[id="cd-btn-sr-create-invoice"] button',
      { hasText: 'Create invoice from template' },
    )
    this.invoiceNumberInput = page.locator('#ppzpclda')
    this.purchaseOrderNumberInput = page.locator('#wvpbdntf')
    this.invoiceDateInput = page.locator('#eatppvdl~input[type="text"]')
    this.paymentTermsInput = page.locator('#gqnqjvon')
    this.dueDateInput = page.locator('#xpqlqwkt~input[type="text"]')
    this.agreementIdInput = page.locator('#nngiaeat')
    this.ocrInput = page.locator('#khmpchvc')
    this.projectNumberInput = page.locator('#pdejwodi')
    this.invoicePeriodFromInput = page.locator('#gewsnbhh~input[type="text"]')
    this.invoicePeriodToInput = page.locator('#aquxzhdb~input[type="text"]')
    this.deliveryDateInput = page.locator('#kkwshvuv~input[type="text"]')
    this.quantityInput = page.locator('input[placeholder="Quantity"]')
    this.addAttachmentButton = page.locator(
      'pag-button[id="cd-btn-tc-add-row"] button',
      { hasText: 'Add Attachment' },
    )
    this.sendButton = page.locator('#sendDocument')
  }

  async createInvoiceFromTemplate() {
    await this.tableRows.first().click()
    await expect(this.createInvoiceFromTemplateButton).toBeVisible()
    await this.createInvoiceFromTemplateButton.click()
  }

  async fillInvoiceDetails(invoice: Invoice) {
    await this.invoiceNumberInput.fill(invoice.invoiceNumber)
    await this.purchaseOrderNumberInput.fill(invoice.purchaseOrderNumber)
    await this.invoiceDateInput.fill(invoice.invoiceDate)
    await this.invoiceDateInput.blur()
    await this.paymentTermsInput.fill(invoice.paymentTerms)
    await this.dueDateInput.fill(invoice.dueDate)
    await this.dueDateInput.blur()
    await this.agreementIdInput.fill(invoice.agreementId)
    await this.ocrInput.fill(invoice.ocr)
    await this.invoicePeriodFromInput.fill(invoice.invoicePeriodFrom)
    await this.invoicePeriodFromInput.blur()
    await this.invoicePeriodToInput.fill(invoice.invoicePeriodTo)
    await this.invoicePeriodToInput.blur()
    await this.deliveryDateInput.fill(invoice.deliveryDate)
    await this.deliveryDateInput.blur()
    await this.projectNumberInput.fill(invoice.projectNumber)
  }

  async setArticleQuantity(quantity: string) {
    await this.quantityInput.fill(String(quantity))
  }

  async addAttachment(path: string) {
    await this.addAttachmentButton.click()
  }
}
