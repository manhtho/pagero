import type { Locator, Page } from '@playwright/test'

export class HeaderBar {
  readonly loggedInLabel: Locator

  constructor(public readonly page: Page) {
    this.loggedInLabel = page.getByText('Logged in as')
  }
}
