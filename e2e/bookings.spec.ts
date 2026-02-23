import { test, expect } from '@playwright/test'
import { loginAsAdmin, loginAsUser } from './helpers.js'

test.describe('Bookings', () => {
  test('authenticated user can view bookings page', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/bookings')
    await expect(page.locator('h1')).toHaveText('My Bookings')
  })

  test('admin sees All Bookings heading', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/bookings')
    await expect(page.locator('h1')).toHaveText('All Bookings')
  })

  test('admin sees search bar', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/bookings')
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
  })

  test('can access new booking form', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/bookings/create')
    await expect(page.locator('h1')).toHaveText('New Booking')
  })

  test('can create a booking', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/bookings/create')

    // Select a hotel from dropdown
    await page.selectOption('select', { index: 1 })

    // Set future dates
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 10)
    const dayAfter = new Date()
    dayAfter.setDate(dayAfter.getDate() + 15)

    const checkIn = tomorrow.toISOString().split('T')[0]
    const checkOut = dayAfter.toISOString().split('T')[0]

    await page.fill('input[id="checkIn"]', checkIn)
    await page.fill('input[id="checkOut"]', checkOut)

    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/bookings/)
  })

  test('unauthenticated user cannot access bookings', async ({ page }) => {
    await page.goto('/bookings')
    await expect(page).toHaveURL(/\/login/)
  })

  test('user sees New Booking link', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/bookings')
    await expect(page.locator('a:has-text("New Booking")')).toBeVisible()
  })
})
