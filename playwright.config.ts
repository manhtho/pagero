import { defineConfig, devices } from '@playwright/test'

const isWebServer = process.env.WEB_SERVER === 'true'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  reporter: 'html',
  use: {
    headless: false,
    baseURL: 'https://www.pageroonline.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Chrome'] },
    },
  ],
  webServer: isWebServer
    ? {
        command: 'npx serve ./site -p 3000',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
})
