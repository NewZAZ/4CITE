import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Users - Show', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('user can view their own profile', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/users/${user.id}`).withInertia().loginAs(user)

    response.assertStatus(200)
    response.assertInertiaComponent('users/show')
    response.assertInertiaPropsContains({
      targetUser: { id: user.id, pseudo: user.pseudo },
    })
  })

  test('regular user cannot view another users profile', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    const response = await client.get(`/users/${user2.id}`).loginAs(user1)

    response.assertStatus(403)
  })

  test('admin can view any users profile', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()

    const response = await client.get(`/users/${user.id}`).withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaComponent('users/show')
  })

  test('employee can view any users profile', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()
    const user = await UserFactory.create()

    const response = await client.get(`/users/${user.id}`).withInertia().loginAs(employee)

    response.assertStatus(200)
    response.assertInertiaComponent('users/show')
  })

  test('returns 404 for non-existent user', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.get('/users/999').loginAs(admin)

    response.assertStatus(404)
  })

  test('user profile includes booking count', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).createMany(3)

    const response = await client.get(`/users/${user.id}`).withInertia().loginAs(user)

    response.assertStatus(200)
    const props = response.inertiaProps as any
    assert.equal(props.totalBookings, 3)
    assert.isArray(props.recentBookings)
  })
})
