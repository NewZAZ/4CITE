import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Booking from '#models/booking'

test.group('Users - Delete', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('user can delete their own account', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.delete(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(user)

    response.assertStatus(302)

    const deleted = await User.find(user.id)
    assert.isNull(deleted)
  })

  test('user cannot delete another users account', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    const response = await client.delete(`/users/${user2.id}`).withCsrfToken().loginAs(user1)

    response.assertStatus(403)
  })

  test('admin can delete any user', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()

    const response = await client.delete(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(admin)

    response.assertStatus(302)

    const deleted = await User.find(user.id)
    assert.isNull(deleted)
  })

  test('returns 404 for non-existent user', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.delete('/users/999').withCsrfToken().loginAs(admin)

    response.assertStatus(404)
  })

  test('deleting user cascades to their bookings', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking1 = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    const booking2 = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.delete(`/users/${user.id}`).withCsrfToken().redirects(0).loginAs(admin)

    response.assertStatus(302)

    const deletedUser = await User.find(user.id)
    assert.isNull(deletedUser)

    const deletedBooking1 = await Booking.find(booking1.id)
    assert.isNull(deletedBooking1)

    const deletedBooking2 = await Booking.find(booking2.id)
    assert.isNull(deletedBooking2)
  })
})
