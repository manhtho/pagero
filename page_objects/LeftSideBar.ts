import type { Locator, Page } from '@playwright/test'

export class LeftSideBar {
  private readonly leftSideBar: Locator
  readonly button: Locator
  readonly anotherButton: Locator

  constructor(public readonly page: Page) {
    this.leftSideBar = page.locator('.leftSidebar')
    this.button = this.leftSideBar.getByRole('button').first()
    this.anotherButton = this.leftSideBar.getByRole('button').nth(1)
  }

  async navigateTo(menuItem: string) {
    await this.leftSideBar.getByText(menuItem).click()
  }
}
