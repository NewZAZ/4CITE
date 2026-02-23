import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import Booking from '#models/booking'

test.group('Bookings - Delete', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('user can delete their own booking', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.delete(`/bookings/${booking.id}`).withCsrfToken().redirects(0).loginAs(user)

    response.assertStatus(302)

    const deleted = await Booking.find(booking.id)
    assert.isNull(deleted)
  })

  test('user cannot delete another users booking', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user1.id, hotelId: hotel.id }).create()

    const response = await client.delete(`/bookings/${booking.id}`).withCsrfToken().loginAs(user2)

    response.assertStatus(403)
  })

  test('admin can delete any booking', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.delete(`/bookings/${booking.id}`).withCsrfToken().redirects(0).loginAs(admin)

    response.assertStatus(302)

    const deleted = await Booking.find(booking.id)
    assert.isNull(deleted)
  })

  test('returns 404 for non-existent booking', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.delete('/bookings/999').withCsrfToken().loginAs(user)

    response.assertStatus(404)
  })

  test('employee cannot delete others bookings', async ({ client, assert }) => {
    const employee = await UserFactory.apply('employee').create()
    const otherUser = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: otherUser.id, hotelId: hotel.id }).create()

    const response = await client
      .delete(`/bookings/${booking.id}`)
      .withCsrfToken()
      .loginAs(employee)

    response.assertStatus(403)

    const stillExists = await Booking.find(booking.id)
    assert.isNotNull(stillExists)
  })
})
