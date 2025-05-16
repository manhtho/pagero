import { test as base } from '@playwright/test'
import { HeaderBar } from '../page_objects/HeaderBar'
import { LeftSideBar } from '../page_objects/LeftSideBar'
import { LoginPage } from '../page_objects/LoginPage'
import { CreateInvoicePage } from '../page_objects/CreateInvoicePage'

type Fixtures = {
  createInvoicePage: CreateInvoicePage
  headerBar: HeaderBar
  leftSideBar: LeftSideBar
  loginPage: LoginPage
}

export const test = base.extend<Fixtures>({
  createInvoicePage: async ({ page }, use) => {
    await use(new CreateInvoicePage(page))
  },
  headerBar: async ({ page }, use) => {
    await use(new HeaderBar(page))
  },
  leftSideBar: async ({ page }, use) => {
    await use(new LeftSideBar(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
})
export { expect } from '@playwright/test'
