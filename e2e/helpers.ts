import { type Page } from '@playwright/test'

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[id="email"]', email)
  await page.fill('input[id="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/(hotels|bookings|users)/)
}

export async function loginAsAdmin(page: Page) {
  await login(page, 'admin@akkor.com', 'Admin@1234')
}

export async function loginAsEmployee(page: Page) {
  await login(page, 'employee@akkor.com', 'Employee@1234')
}

export async function loginAsUser(page: Page) {
  await login(page, 'user@akkor.com', 'User@1234')
}

export async function logout(page: Page) {
  // Click the user avatar button to open dropdown
  await page.click('button:has(.rounded-full)')
  // Click the Logout button
  await page.click('a[data-method="post"][href="/logout"], button:has-text("Logout")')
  await page.waitForURL('/login')
}
