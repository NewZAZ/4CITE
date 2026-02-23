import { test } from '@japa/runner'
import { HotelFactory } from '#database/factories/hotel_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Hotel Model', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can create a hotel with valid data', async ({ assert }) => {
    const hotel = await HotelFactory.create()
    assert.isNotNull(hotel.id)
    assert.isNotNull(hotel.name)
    assert.isNotNull(hotel.location)
    assert.isNotNull(hotel.description)
  })

  test('hotel has correct properties', async ({ assert }) => {
    const hotel = await HotelFactory.create()
    const serialized = hotel.serialize()
    assert.property(serialized, 'id')
    assert.property(serialized, 'name')
    assert.property(serialized, 'location')
    assert.property(serialized, 'description')
    assert.property(serialized, 'pictureList')
    assert.property(serialized, 'createdAt')
  })

  test('can create multiple hotels', async ({ assert }) => {
    const hotels = await HotelFactory.createMany(5)
    assert.lengthOf(hotels, 5)
  })

  test('hotel has bookings relationship', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).createMany(3)

    await hotel.load('bookings')
    assert.isArray(hotel.bookings)
    assert.lengthOf(hotel.bookings, 3)
  })

  test('pictureList handles null values', async ({ assert }) => {
    const hotel = await HotelFactory.merge({ pictureList: null }).create()

    await hotel.refresh()
    assert.isNull(hotel.pictureList)
  })
})
