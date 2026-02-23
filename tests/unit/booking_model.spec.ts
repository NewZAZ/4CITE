import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Booking Model', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can create a booking with valid data', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    assert.isNotNull(booking.id)
    assert.equal(booking.userId, user.id)
    assert.equal(booking.hotelId, hotel.id)
    assert.equal(booking.status, 'confirmed')
  })

  test('booking has correct properties', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    const serialized = booking.serialize()
    assert.property(serialized, 'id')
    assert.property(serialized, 'userId')
    assert.property(serialized, 'hotelId')
    assert.property(serialized, 'checkIn')
    assert.property(serialized, 'checkOut')
    assert.property(serialized, 'status')
  })

  test('booking belongs to user', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    await booking.load('user')
    assert.equal(booking.user.id, user.id)
  })

  test('booking belongs to hotel', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    await booking.load('hotel')
    assert.equal(booking.hotel.id, hotel.id)
  })

  test('booking has correct status values', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()

    const pendingBooking = await BookingFactory.merge({
      userId: user.id,
      hotelId: hotel.id,
      status: 'pending',
    }).create()
    assert.equal(pendingBooking.status, 'pending')

    const confirmedBooking = await BookingFactory.merge({
      userId: user.id,
      hotelId: hotel.id,
      status: 'confirmed',
    }).create()
    assert.equal(confirmedBooking.status, 'confirmed')

    const cancelledBooking = await BookingFactory.merge({
      userId: user.id,
      hotelId: hotel.id,
      status: 'cancelled',
    }).create()
    assert.equal(cancelledBooking.status, 'cancelled')
  })

  test('booking dates are stored correctly', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const { DateTime } = await import('luxon')

    const checkIn = DateTime.now().plus({ days: 10 })
    const checkOut = DateTime.now().plus({ days: 15 })

    const booking = await BookingFactory.merge({
      userId: user.id,
      hotelId: hotel.id,
      checkIn,
      checkOut,
    }).create()

    await booking.refresh()
    assert.equal(booking.checkIn.toFormat('yyyy-MM-dd'), checkIn.toFormat('yyyy-MM-dd'))
    assert.equal(booking.checkOut.toFormat('yyyy-MM-dd'), checkOut.toFormat('yyyy-MM-dd'))
  })
})
