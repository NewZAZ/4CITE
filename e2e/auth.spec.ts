import { test, expect } from '@playwright/test'
import { loginAsAdmin } from './helpers.js'

test.describe('Authentication', () => {
  test('can view login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toHaveText('Login')
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[id="password"]')).toBeVisible()
  })

  test('can view register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('h1')).toHaveText('Create an account')
    await expect(page.locator('input[id="pseudo"]')).toBeVisible()
  })

  test('can login with valid credentials', async ({ page }) => {
    await loginAsAdmin(page)
    await expect(page).toHaveURL(/\/hotels/)
  })

  test('shows error with wrong password', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[id="email"]', 'admin@akkor.com')
    await page.fill('input[id="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    // Should redirect back to login or show error
    await expect(page).toHaveURL(/\/login/)
  })

  test('can register a new account', async ({ page }) => {
    const uniqueEmail = `e2e-${Date.now()}@test.com`
    await page.goto('/register')
    await page.fill('input[id="pseudo"]', 'E2ETestUser')
    await page.fill('input[id="email"]', uniqueEmail)
    await page.fill('input[id="password"]', 'Test@12345')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/hotels/)
  })

  test('unauthenticated user is redirected from protected routes', async ({ page }) => {
    await page.goto('/bookings')
    await expect(page).toHaveURL(/\/login/)
  })

  test('can navigate from login to register', async ({ page }) => {
    await page.goto('/login')
    await page.click('a[href="/register"]')
    await expect(page).toHaveURL(/\/register/)
  })
})
