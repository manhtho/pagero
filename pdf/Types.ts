export type CompanyInfo = {
  name: string
  address: string
  companyId: string
  taxId: string
  companyNumber: string
}

export type Payment = {
  method: string
  variableSymbol: string
  accountNumber: string
}

export type Dates = {
  issueDate: string
  taxableSupplyDate: string
  dueDate: string
}

export type Item = {
  service: string
  hours: number
  manDays?: number
  ratePerManDay: number
  taxBase?: number
  vatRate: number
  vatAmount?: number
  totalWithVAT?: number
}

export type Invoice = {
  invoiceNumber: string
  supplier: CompanyInfo
  customer: CompanyInfo
  orderNumber: string
  payment: Payment
  dates: Dates
  description: string
  items: Item[]
  total?: {
    taxBase: number
    vatRate: number
    vatAmount: number
    totalWithVAT: number
  }
}
