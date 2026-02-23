import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import Hotel from '#models/hotel'
import Booking from '#models/booking'

test.group('Hotels - Delete', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('admin can delete a hotel', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const hotel = await HotelFactory.create()

    const response = await client.delete(`/hotels/${hotel.id}`).withCsrfToken().redirects(0).loginAs(admin)

    response.assertStatus(302)

    const deleted = await Hotel.find(hotel.id)
    assert.isNull(deleted)
  })

  test('regular user cannot delete a hotel', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const response = await client.delete(`/hotels/${hotel.id}`).withCsrfToken().loginAs(user)

    response.assertStatus(403)
  })

  test('employee cannot delete a hotel', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()
    const hotel = await HotelFactory.create()

    const response = await client.delete(`/hotels/${hotel.id}`).withCsrfToken().loginAs(employee)

    response.assertStatus(403)
  })

  test('returns 404 for non-existent hotel', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()

    const response = await client.delete('/hotels/999').withCsrfToken().loginAs(admin)

    response.assertStatus(404)
  })

  test('deleting hotel cascades to its bookings', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.delete(`/hotels/${hotel.id}`).withCsrfToken().redirects(0).loginAs(admin)

    response.assertStatus(302)

    const deletedHotel = await Hotel.find(hotel.id)
    assert.isNull(deletedHotel)

    const deletedBooking = await Booking.find(booking.id)
    assert.isNull(deletedBooking)
  })
})
