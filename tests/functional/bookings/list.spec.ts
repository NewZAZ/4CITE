import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { HotelFactory } from '#database/factories/hotel_factory'
import { BookingFactory } from '#database/factories/booking_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Bookings - List', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('authenticated user can list their bookings', async ({ client }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).createMany(3)

    const response = await client.get('/bookings').withInertia().loginAs(user)

    response.assertStatus(200)
    response.assertInertiaComponent('bookings/index')
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 3 } },
    })
  })

  test('user can only see their own bookings', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user1.id, hotelId: hotel.id }).createMany(2)
    await BookingFactory.merge({ userId: user2.id, hotelId: hotel.id }).createMany(3)

    const response = await client.get('/bookings').withInertia().loginAs(user1)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 2 } },
    })
  })

  test('admin can see all bookings', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).createMany(3)
    await BookingFactory.merge({ userId: admin.id, hotelId: hotel.id }).createMany(2)

    const response = await client.get('/bookings').withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 5 } },
    })
  })

  test('unauthenticated user cannot list bookings', async ({ client }) => {
    const response = await client.get('/bookings').redirects(0)

    response.assertStatus(302)
  })

  test('admin can search bookings by user pseudo', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const user1 = await UserFactory.merge({ pseudo: 'JohnDoe' }).create()
    const user2 = await UserFactory.merge({ pseudo: 'JaneSmith' }).create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user1.id, hotelId: hotel.id }).create()
    await BookingFactory.merge({ userId: user2.id, hotelId: hotel.id }).create()

    const response = await client.get('/bookings?search=JohnDoe').withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 1 } },
    })
  })

  test('admin can search bookings by booking ID', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.get(`/bookings?search=${booking.id}`).withInertia().loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 1 } },
    })
  })

  test('admin search by email', async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const user = await UserFactory.merge({ email: 'searchme@test.com' }).create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client
      .get('/bookings?search=searchme@test.com')
      .withInertia()
      .loginAs(admin)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 1 } },
    })
  })

  test('bookings are ordered by createdAt desc', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const hotel = await HotelFactory.create()
    const booking1 = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()
    const booking2 = await BookingFactory.merge({ userId: user.id, hotelId: hotel.id }).create()

    const response = await client.get('/bookings').withInertia().loginAs(user)

    response.assertStatus(200)
    const props = response.inertiaProps as any
    const data = props.bookings.data
    assert.isTrue(data.length >= 2)
    // booking2 was created after booking1, so it should appear first (desc order)
    const idx1 = data.findIndex((b: any) => b.id === booking1.id)
    const idx2 = data.findIndex((b: any) => b.id === booking2.id)
    assert.isTrue(idx2 < idx1)
  })

  test('employee cannot see all bookings (only own)', async ({ client }) => {
    const employee = await UserFactory.apply('employee').create()
    const otherUser = await UserFactory.create()
    const hotel = await HotelFactory.create()
    await BookingFactory.merge({ userId: employee.id, hotelId: hotel.id }).createMany(2)
    await BookingFactory.merge({ userId: otherUser.id, hotelId: hotel.id }).createMany(3)

    const response = await client.get('/bookings').withInertia().loginAs(employee)

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      bookings: { meta: { total: 2 } },
    })
  })
})
