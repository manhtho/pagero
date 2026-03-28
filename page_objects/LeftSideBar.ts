import type { Locator, Page } from '@playwright/test'

export class LeftSideBar {
  private readonly leftSideBar: Locator
  readonly button: Locator

  constructor(public readonly page: Page) {
    this.leftSideBar = page.locator('.leftSidebar')
    this.button = this.leftSideBar.getByRole('button')
  }

  async navigateTo(menuItem: string) {
    await this.leftSideBar.getByText(menuItem).click()
  }
}
