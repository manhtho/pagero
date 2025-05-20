import Handlebars = require('handlebars')
import { Invoice, Item } from './Types'
import * as fs from 'node:fs'
import * as path from 'node:path'

const invoiceData: Omit<Invoice, 'items' | 'total'> = {
  invoiceNumber: '202504001',
  supplier: {
    name: 'Konzultant s.r.o.',
    address: 'Křižíkova 12, 186 00 Praha 8',
    companyId: '12345678',
    taxId: 'CZ12345678',
    companyNumber: 'SUP001',
  },
  customer: {
    name: 'Tech Solutions a.s.',
    address: 'Jungmannova 32, 110 00 Praha 1',
    companyId: '87654321',
    taxId: 'CZ87654321',
    companyNumber: 'CUST045',
  },
  orderNumber: 'OBJ20250415',
  payment: {
    method: 'Bankovní převod',
    variableSymbol: '202504001',
    accountNumber: '123456789/0100',
  },
  dates: {
    issueDate: '2025-04-30',
    taxableSupplyDate: '2025-04-30',
    dueDate: '2025-05-14',
  },
  description:
    'Na základě smlouvy o poskytování Consultancy Services production-natural person Vám fakturujeme smluvní odměnu za období od 01.04.2025 do 30.04.2025 v těchto položkách:',
}

const items: Item[] = [
  {
    service: 'Consultancy Services production-natural person',
    hours: 160,
    ratePerManDay: 10000,
    vatRate: 21,
  },
]

function createInvoice(
  base: Omit<Invoice, 'items' | 'total'>,
  rawItems: Item[],
): Invoice {
  const items: Item[] = rawItems.map((item) => {
    const manDays = item.hours / 8
    const taxBase = manDays * item.ratePerManDay
    const vatAmount = taxBase * (item.vatRate / 100)
    const totalWithVAT = taxBase + vatAmount

    return {
      service: item.service,
      hours: item.hours,
      manDays,
      ratePerManDay: item.ratePerManDay,
      taxBase,
      vatRate: item.vatRate,
      vatAmount,
      totalWithVAT,
    }
  })

  const total = items.reduce(
    (acc, item) => {
      acc.taxBase += item.taxBase
      acc.vatAmount += item.vatAmount
      acc.totalWithVAT += item.totalWithVAT
      return acc
    },
    {
      taxBase: 0,
      vatRate: items[0]?.vatRate || 21,
      vatAmount: 0,
      totalWithVAT: 0,
    },
  )

  return {
    ...base,
    items,
    total,
  }
}

export const invoice = createInvoice(invoiceData, items)

export function renderInvoice(invoice: Invoice): string {
  const templatePath = path.resolve(
    __dirname,
    'templates',
    'invoice-template.html',
  )
  const outputPath = path.resolve(
    __dirname,
    '..',
    'pdf',
    'generated-invoice.html',
  )

  const templateHtml = fs.readFileSync(templatePath, 'utf-8')
  const template = Handlebars.compile(templateHtml)
  const html = template(invoice)
  fs.writeFileSync(outputPath, html)
  return outputPath
}
