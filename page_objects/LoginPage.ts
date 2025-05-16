import type { Locator, Page } from '@playwright/test'

export class LoginPage {
  private readonly usernameInput: Locator
  private readonly continueButton: Locator
  private readonly passwordInput: Locator
  private readonly loginButton: Locator

  constructor(public readonly page: Page) {
    this.usernameInput = page.locator('#username')
    this.continueButton = page.locator('//button[text()="Continue"]')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('//button[text()="Log in"]')
  }

  async login(username: string, password: string) {
    await this.page.goto('/')
    await this.usernameInput.fill(username)
    await this.continueButton.click()
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
