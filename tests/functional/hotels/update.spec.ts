import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Hotels - Update', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('admin can view edit hotel page', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const hotel = await HotelFactory.create()

    const response = await client.get(`/hotels/${hotel.id}/edit`).withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaComponent('hotels/edit')
  })

  test('admin can update a hotel', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const hotel = await HotelFactory.create()

    const response = await client.put(`/hotels/${hotel.id}`).withCsrfToken().redirects(0).loginAs(admin).form({
      name: 'Updated Hotel Name',
    })

    response.assertStatus(302)

    await hotel.refresh()
    assert.equal(hotel.name, 'Updated Hotel Name')
  })

  test('regular user cannot update a hotel', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const response = await client.put(`/hotels/${hotel.id}`).withCsrfToken().loginAs(user).form({
      name: 'Updated Name',
    })

    response.assertStatus(403)
  })

  test('returns 404 for non-existent hotel', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.put('/hotels/999').withCsrfToken().loginAs(admin).form({
      name: 'Updated Name',
    })

    response.assertStatus(404)
  })

  test('admin can do partial update (only name)', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const hotel = await HotelFactory.merge({
      name: 'Original Name',
      location: 'Original Location',
    }).create()
    const originalLocation = hotel.location

    const response = await client.put(`/hotels/${hotel.id}`).withCsrfToken().redirects(0).loginAs(admin).form({
      name: 'Updated Name Only',
    })

    response.assertStatus(302)

    await hotel.refresh()
    assert.equal(hotel.name, 'Updated Name Only')
    assert.equal(hotel.location, originalLocation)
  })

  test('employee cannot update hotels', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()
    const hotel = await HotelFactory.create()

    const response = await client
      .put(`/hotels/${hotel.id}`)
      .withCsrfToken()
      .loginAs(employee)
      .form({
        name: 'Hacked Name',
      })

    response.assertStatus(403)
  })
})
