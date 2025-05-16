export const config = {
  credentials: {
    username: '', // Vyplň email
    password: '', // Vyplň heslo
  },

  invoice: {
    invoiceNumber: '', // Číslo faktury
    purchaseOrderNumber: '', // Číslo objednávky
    invoiceDate: '', // MM/dd/yyyy – datum vystavení faktury
    projectNumber: '', // Číslo projektu
    reportedHours: 0, // Počet vykázaných hodin

    // Optional overrides (use if needed)
    ocr: undefined, // Např. Číslo faktury
    paymentTerms: undefined, // Např. 30
    dueDate: undefined, // Např. '04/30/2025'
    agreementId: undefined, // Např. '03/31/2025'
    invoicePeriodFrom: undefined, // Např. '03/01/2025'
    invoicePeriodTo: undefined, // Např. '03/31/2025'
    deliveryDate: undefined, // Např. '03/31/2025'
  },
}
