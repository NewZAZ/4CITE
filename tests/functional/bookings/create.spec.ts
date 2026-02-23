import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import Booking from '#models/booking'
import { DateTime } from 'luxon'

test.group('Bookings - Create', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('authenticated user can view create booking page', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get('/bookings/create').withInertia().loginAs(user)

    response.assertStatus(200)
    response.assertInertiaComponent('bookings/create')
  })

  test('authenticated user can create a booking', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const checkIn = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd')
    const checkOut = DateTime.now().plus({ days: 15 }).toFormat('yyyy-MM-dd')

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      hotelId: hotel.id,
      checkIn,
      checkOut,
    })

    response.assertStatus(302)

    const booking = await Booking.query().where('userId', user.id).first()
    assert.isNotNull(booking)
    assert.equal(booking!.hotelId, hotel.id)
    assert.equal(booking!.status, 'confirmed')
  })

  test('cannot create booking with past check-in date', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      hotelId: hotel.id,
      checkIn: '2020-01-01',
      checkOut: '2020-01-05',
    })

    response.assertStatus(302)
  })

  test('cannot create booking with check-out before check-in', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const checkIn = DateTime.now().plus({ days: 15 }).toFormat('yyyy-MM-dd')
    const checkOut = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd')

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      hotelId: hotel.id,
      checkIn,
      checkOut,
    })

    response.assertStatus(302)
  })

  test('cannot create booking for non-existent hotel', async ({ client }) => {
    const user = await UserFactory.create()

    const checkIn = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd')
    const checkOut = DateTime.now().plus({ days: 15 }).toFormat('yyyy-MM-dd')

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      hotelId: 99999,
      checkIn,
      checkOut,
    })

    response.assertStatus(404)
  })

  test('unauthenticated user cannot create a booking', async ({ client }) => {
    const hotel = await HotelFactory.create()

    const response = await client.post('/bookings').withCsrfToken().redirects(0).form({
      hotelId: hotel.id,
      checkIn: '2030-01-01',
      checkOut: '2030-01-05',
    })

    response.assertStatus(302)
  })

  test('cannot create booking with missing fields', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({})

    response.assertStatus(302)
  })

  test('rejects booking with missing hotelId', async ({ client }) => {
    const user = await UserFactory.create()

    const checkIn = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd')
    const checkOut = DateTime.now().plus({ days: 15 }).toFormat('yyyy-MM-dd')

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      checkIn,
      checkOut,
    })

    response.assertStatus(302)
  })

  test('rejects booking with check-out same as check-in', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const sameDate = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd')

    const response = await client.post('/bookings').withCsrfToken().redirects(0).loginAs(user).form({
      hotelId: hotel.id,
      checkIn: sameDate,
      checkOut: sameDate,
    })

    response.assertStatus(302)
  })
})
