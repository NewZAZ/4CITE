import { test, expect } from '@playwright/test'
import { loginAsAdmin, loginAsEmployee, loginAsUser } from './helpers.js'

test.describe('User Management', () => {
  test('admin can view user list', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/users')
    await expect(page.locator('h1')).toHaveText('Users')
    await expect(page.locator('table')).toBeVisible()
  })

  test('employee can view user list', async ({ page }) => {
    await loginAsEmployee(page)
    await page.goto('/users')
    await expect(page.locator('h1')).toHaveText('Users')
  })

  test('regular user is denied access to user list', async ({ page }) => {
    await loginAsUser(page)
    const response = await page.goto('/users')
    expect(response?.status()).toBe(403)
  })

  test('user can view own profile', async ({ page }) => {
    await loginAsUser(page)
    // Navigate to own profile via dropdown
    await page.click('button:has(.rounded-full)')
    await page.click('a:has-text("My Profile")')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Account Info')).toBeVisible()
    await expect(page.locator('text=Statistics')).toBeVisible()
  })

  test('admin can view any user profile', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/users')
    // Click first View link
    const firstViewLink = page.locator('a:has-text("View")').first()
    await firstViewLink.click()
    await expect(page).toHaveURL(/\/users\/\d+/)
    await expect(page.locator('text=Account Info')).toBeVisible()
  })

  test('user can access own edit page', async ({ page }) => {
    await loginAsUser(page)
    await page.click('button:has(.rounded-full)')
    await page.click('a:has-text("Settings")')
    await expect(page).toHaveURL(/\/users\/\d+\/edit/)
  })

  test('users page shows role badges', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/users')
    await expect(page.locator('text=admin').first()).toBeVisible()
  })
})
