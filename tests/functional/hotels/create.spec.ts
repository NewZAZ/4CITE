import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import Hotel from '#models/hotel'

test.group('Hotels - Create', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('admin can view create hotel page', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.get('/hotels/create').withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaComponent('hotels/create')
  })

  test('admin can create a hotel', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.post('/hotels').withCsrfToken().redirects(0).loginAs(admin).form({
      name: 'Test Hotel',
      location: 'Paris',
      description: 'A beautiful test hotel',
    })

    response.assertStatus(302)

    const hotel = await Hotel.findBy('name', 'Test Hotel')
    assert.isNotNull(hotel)
    assert.equal(hotel!.location, 'Paris')
  })

  test('regular user cannot create a hotel', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/hotels').withCsrfToken().loginAs(user).form({
      name: 'Test Hotel',
      location: 'Paris',
      description: 'A test hotel',
    })

    response.assertStatus(403)
  })

  test('employee cannot create a hotel', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()

    const response = await client.post('/hotels').withCsrfToken().loginAs(employee).form({
      name: 'Test Hotel',
      location: 'Paris',
      description: 'A test hotel',
    })

    response.assertStatus(403)
  })

  test('unauthenticated user cannot create a hotel', async ({ client }) => {
    const response = await client.post('/hotels').withCsrfToken().redirects(0).form({
      name: 'Test Hotel',
      location: 'Paris',
      description: 'A test hotel',
    })

    response.assertStatus(302)
  })

  test('cannot create hotel with missing fields', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.post('/hotels').withCsrfToken().redirects(0).loginAs(admin).form({
      name: '',
    })

    response.assertStatus(302)
  })

  test('rejects hotel with empty name', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.post('/hotels').withCsrfToken().redirects(0).loginAs(admin).form({
      name: '',
      location: 'Paris',
      description: 'A test hotel',
    })

    response.assertStatus(302)
  })

  test('rejects hotel with name exceeding max length', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client
      .post('/hotels')
      .withCsrfToken()
      .redirects(0)
      .loginAs(admin)
      .form({
        name: 'A'.repeat(300),
        location: 'Paris',
        description: 'A test hotel',
      })

    response.assertStatus(302)
  })
})
