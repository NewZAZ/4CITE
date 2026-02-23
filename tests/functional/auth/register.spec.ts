import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'

test.group('Auth - Register', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can view register page', async ({ client }) => {
    const response = await client.get('/register').withInertia()
    response.assertStatus(200)
    response.assertInertiaComponent('auth/register')
  })

  test('can register with valid data', async ({ client, assert }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'testuser',
      email: 'test@example.com',
      password: 'Test@1234',
    })

    response.assertStatus(302)

    const user = await User.findBy('email', 'test@example.com')
    assert.isNotNull(user)
    assert.equal(user!.pseudo, 'testuser')
    assert.equal(user!.role, 'user')
  })

  test('cannot register with invalid email', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'testuser',
      email: 'invalid-email',
      password: 'Test@1234',
    })

    response.assertStatus(302)
  })

  test('cannot register with short password', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'testuser',
      email: 'test@example.com',
      password: 'short',
    })

    response.assertStatus(302)
  })

  test('cannot register with existing email', async ({ client }) => {
    const existingUser = await UserFactory.create()

    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'testuser',
      email: existingUser.email,
      password: 'Test@1234',
    })

    response.assertStatus(422)
  })

  test('cannot register with missing fields', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({})

    response.assertStatus(302)
  })

  test('cannot register with short pseudo', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'ab',
      email: 'test@example.com',
      password: 'Test@1234',
    })

    response.assertStatus(302)
  })

  test('rejects registration with invalid email format', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: 'testuser',
      email: 'notanemail',
      password: 'Test@1234',
    })

    response.assertStatus(302)
  })

  test('trims whitespace from pseudo', async ({ client, assert }) => {
    const response = await client.post('/register').withCsrfToken().redirects(0).form({
      pseudo: '  TestUser  ',
      email: 'trimtest@example.com',
      password: 'Test@1234',
    })

    response.assertStatus(302)

    const user = await User.findBy('email', 'trimtest@example.com')
    assert.isNotNull(user)
    assert.equal(user!.pseudo, 'TestUser')
  })
})
