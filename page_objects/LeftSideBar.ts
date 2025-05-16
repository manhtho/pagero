import type { Locator, Page } from '@playwright/test'

export class LeftSideBar {
  private readonly leftSideBar: Locator

  constructor(public readonly page: Page) {
    this.leftSideBar = page.locator('.leftSidebar')
  }

  async navigateTo(menuItem: string) {
    await this.leftSideBar.getByText(menuItem).click()
  }
}
