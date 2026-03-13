import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? 'list' : 'html',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
