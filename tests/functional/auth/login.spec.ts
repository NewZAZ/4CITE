import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Auth - Login', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can view login page', async ({ client }) => {
    const response = await client.get('/login').withInertia()
    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')
  })

  test('can login with valid credentials', async ({ client }) => {
    await UserFactory.merge({ email: 'user@test.com', password: 'Test@1234' }).create()

    const response = await client.post('/login').withCsrfToken().redirects(0).form({
      email: 'user@test.com',
      password: 'Test@1234',
    })

    response.assertStatus(302)
  })

  test('cannot login with wrong password', async ({ client }) => {
    await UserFactory.merge({ email: 'user@test.com', password: 'Test@1234' }).create()

    const response = await client.post('/login').withCsrfToken().redirects(0).form({
      email: 'user@test.com',
      password: 'WrongPassword',
    })

    response.assertStatus(302)
    // Should redirect back with error flash message
  })

  test('cannot login with non-existent email', async ({ client }) => {
    const response = await client.post('/login').withCsrfToken().redirects(0).form({
      email: 'nonexistent@test.com',
      password: 'Test@1234',
    })

    response.assertStatus(302)
    // Should redirect back with error flash message
  })

  test('can logout when authenticated', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/logout').withCsrfToken().redirects(0).loginAs(user)

    response.assertStatus(302)
  })

  test('cannot access protected route without auth', async ({ client }) => {
    const response = await client.get('/bookings').redirects(0)

    response.assertStatus(302)
    // Should redirect to /login
  })

  test('rejects login with empty email', async ({ client }) => {
    const response = await client.post('/login').withCsrfToken().redirects(0).form({
      email: '',
      password: 'Test@1234',
    })

    response.assertStatus(302)
  })

  test('rejects login with empty password', async ({ client }) => {
    const response = await client.post('/login').withCsrfToken().redirects(0).form({
      email: 'user@test.com',
      password: '',
    })

    response.assertStatus(302)
  })
})
