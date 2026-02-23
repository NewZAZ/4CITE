import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('User Model', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can create a user with valid data', async ({ assert }) => {
    const user = await UserFactory.create()
    assert.isNotNull(user.id)
    assert.isNotNull(user.pseudo)
    assert.isNotNull(user.email)
    assert.equal(user.role, 'user')
  })

  test('can create an admin user', async ({ assert }) => {
    const user = await UserFactory.apply('admin').create()
    assert.equal(user.role, 'admin')
  })

  test('can create an employee user', async ({ assert }) => {
    const user = await UserFactory.apply('employee').create()
    assert.equal(user.role, 'employee')
  })

  test('password is not serialized', async ({ assert }) => {
    const user = await UserFactory.create()
    const serialized = user.serialize()
    assert.notProperty(serialized, 'password')
  })

  test('user has correct properties', async ({ assert }) => {
    const user = await UserFactory.create()
    const serialized = user.serialize()
    assert.property(serialized, 'id')
    assert.property(serialized, 'pseudo')
    assert.property(serialized, 'email')
    assert.property(serialized, 'role')
    assert.property(serialized, 'createdAt')
  })

  test('password is hashed and not stored in plain text', async ({ assert }) => {
    const user = await UserFactory.merge({ password: 'Test@1234' }).create()
    assert.notEqual(user.password, 'Test@1234')
    assert.isTrue(user.password.length > 0)
  })

  test('user has bookings relationship', async ({ assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).createMany(2)

    await user.load('bookings')
    assert.isArray(user.bookings)
    assert.lengthOf(user.bookings, 2)
  })
})
