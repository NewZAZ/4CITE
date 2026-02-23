import { test, expect } from '@playwright/test'
import { loginAsAdmin, loginAsUser } from './helpers.js'

test.describe('Hotels', () => {
  test('can browse hotels without authentication', async ({ page }) => {
    await page.goto('/hotels')
    await expect(page.locator('h1')).toHaveText('Hotels')
    await expect(page.locator('table')).toBeVisible()
  })

  test('can search hotels', async ({ page }) => {
    await page.goto('/hotels')
    await page.fill('input[placeholder*="Search"]', 'Paris')
    await page.click('button:has-text("Search")')
    await expect(page).toHaveURL(/search=Paris/)
  })

  test('can view hotel detail', async ({ page }) => {
    await page.goto('/hotels')
    // Click first hotel View link
    const firstViewLink = page.locator('a:has-text("View")').first()
    await firstViewLink.click()
    await expect(page).toHaveURL(/\/hotels\/\d+/)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Description')).toBeVisible()
  })

  test('authenticated user sees Book Now button', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/hotels')
    const firstViewLink = page.locator('a:has-text("View")').first()
    await firstViewLink.click()
    await expect(page.locator('a:has-text("Book Now")')).toBeVisible()
  })

  test('admin sees Add Hotel button on hotel list', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/hotels')
    await expect(page.locator('a:has-text("Add Hotel")').first()).toBeVisible()
  })

  test('admin can create a hotel', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/hotels/create')
    await page.fill('input[id="name"]', `E2E Test Hotel ${Date.now()}`)
    await page.fill('input[id="location"]', 'E2E City')
    await page.fill('textarea[id="description"]', 'A hotel created by E2E tests')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/hotels/)
  })

  test('admin sees Edit and Delete on hotel detail', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/hotels')
    const firstViewLink = page.locator('a:has-text("View")').first()
    await firstViewLink.click()
    await expect(page.locator('a:has-text("Edit")')).toBeVisible()
    await expect(page.locator('button:has-text("Delete")')).toBeVisible()
  })

  test('regular user does not see admin controls', async ({ page }) => {
    await loginAsUser(page)
    await page.goto('/hotels')
    const firstViewLink = page.locator('a:has-text("View")').first()
    await firstViewLink.click()
    await expect(page.locator('button:has-text("Delete")')).not.toBeVisible()
  })
})
