import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Bookings - Update', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('user can view edit page for their booking', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.get(`/bookings/${booking.id}/edit`).withInertia().loginAs(user)

    response.assertStatus(200)
    response.assertInertiaComponent('bookings/edit')
  })

  test('user can update their own booking', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client
      .put(`/bookings/${booking.id}`)
      .withCsrfToken()
      .redirects(0)
      .loginAs(user)
      .form({
        status: 'cancelled',
      })

    response.assertStatus(302)

    await booking.refresh()
    assert.equal(booking.status, 'cancelled')
  })

  test('user cannot update another users booking', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user1.id, hotelId: hotel.id }).create()

    const response = await client
      .put(`/bookings/${booking.id}`)
      .withCsrfToken()
      .loginAs(user2)
      .form({
        status: 'cancelled',
      })

    response.assertStatus(403)
  })

  test('admin can update any booking', async ({ client, assert }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client
      .put(`/bookings/${booking.id}`)
      .withCsrfToken()
      .redirects(0)
      .loginAs(admin)
      .form({
        status: 'cancelled',
      })

    response.assertStatus(302)

    await booking.refresh()
    assert.equal(booking.status, 'cancelled')
  })

  test('returns 404 for non-existent booking', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.put('/bookings/999').withCsrfToken().loginAs(user).form({
      status: 'cancelled',
    })

    response.assertStatus(404)
  })

  test('can update booking status to cancelled', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({
      userId: user.id,
      hotelId: hotel.id,
      status: 'confirmed',
    }).create()

    const response = await client
      .put(`/bookings/${booking.id}`)
      .withCsrfToken()
      .redirects(0)
      .loginAs(user)
      .form({
        status: 'cancelled',
      })

    response.assertStatus(302)

    await booking.refresh()
    assert.equal(booking.status, 'cancelled')
  })

  test('rejects update with past check-in date', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client
      .put(`/bookings/${booking.id}`)
      .withCsrfToken()
      .redirects(0)
      .loginAs(user)
      .form({
        checkIn: '2020-01-01',
      })

    response.assertStatus(302)
  })
})
