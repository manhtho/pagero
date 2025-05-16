import { config } from '../import.config'
import {
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  format,
  isSaturday,
  isSunday,
  parse,
  startOfMonth,
  subDays,
} from 'date-fns'

export type Invoice = {
  invoiceNumber: string
  purchaseOrderNumber: string
  invoiceDate: string
  paymentTerms?: string
  dueDate?: string
  agreementId?: string
  ocr?: string
  projectNumber: string
  invoicePeriodFrom?: string
  invoicePeriodTo?: string
  deliveryDate?: string
  manDays: string
}

export const getInvoice = (): Invoice => {
  const data = config.invoice
  if (
    !data.invoiceNumber ||
    !data.purchaseOrderNumber ||
    !data.invoiceDate ||
    !data.reportedHours ||
    !data.projectNumber
  ) {
    throw new Error('Chybí požadované proměnné!')
  }

  const invoiceDate = parse(data.invoiceDate, 'MM/dd/yyyy', new Date())
  const formattedInvoiceDate = format(invoiceDate, 'MM/dd/yyyy')

  let dueDate = endOfMonth(addMonths(invoiceDate, 1))
  if (isSaturday(dueDate)) dueDate = subDays(dueDate, 1)
  else if (isSunday(dueDate)) dueDate = subDays(dueDate, 2)

  const invoice = {
    invoiceNumber: data.invoiceNumber,
    purchaseOrderNumber: data.purchaseOrderNumber,
    invoiceDate: formattedInvoiceDate,
    paymentTerms:
      data.paymentTerms ??
      String(differenceInCalendarDays(dueDate, invoiceDate)),
    dueDate: data.dueDate ?? format(dueDate, 'MM/dd/yyyy'),
    agreementId: data.agreementId ?? formattedInvoiceDate,
    ocr: data.ocr ?? data.invoiceNumber,
    projectNumber: data.projectNumber,
    invoicePeriodFrom:
      data.invoicePeriodFrom ?? format(startOfMonth(invoiceDate), 'MM/dd/yyyy'),
    invoicePeriodTo:
      data.invoicePeriodTo ?? format(endOfMonth(invoiceDate), 'MM/dd/yyyy'),
    deliveryDate: data.deliveryDate ?? formattedInvoiceDate,
    manDays: String(data.reportedHours / 8),
  }

  console.log('Invoice:', invoice)
  return invoice
}
