import { test } from '@japa/runner'
import { HotelFactory } from '#database/factories/hotel_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Hotels - List', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can list hotels without auth', async ({ client }) => {
    await HotelFactory.createMany(3)

    const response = await client.get('/hotels').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('hotels/index')
    response.assertInertiaPropsContains({
      hotels: { meta: { total: 3 } },
    })
  })

  test('hotels are paginated with default limit of 10', async ({ client }) => {
    await HotelFactory.createMany(15)

    const response = await client.get('/hotels').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { perPage: 10 } },
    })
  })

  test('can change pagination limit', async ({ client }) => {
    await HotelFactory.createMany(10)

    const response = await client.get('/hotels?limit=5').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { perPage: 5 } },
    })
  })

  test('can sort hotels by name ascending', async ({ client }) => {
    await HotelFactory.merge({ name: 'Zulu Hotel' }).create()
    await HotelFactory.merge({ name: 'Alpha Hotel' }).create()

    const response = await client.get('/hotels?sort=name&order=asc').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('hotels/index')
  })

  test('can sort hotels by location', async ({ client }) => {
    await HotelFactory.merge({ location: 'Paris' }).create()
    await HotelFactory.merge({ location: 'Amsterdam' }).create()

    const response = await client.get('/hotels?sort=location&order=asc').withInertia()

    response.assertStatus(200)
  })

  test('can search hotels by name', async ({ client }) => {
    await HotelFactory.merge({ name: 'Grand Palace' }).create()
    await HotelFactory.merge({ name: 'Tiny Inn' }).create()

    const response = await client.get('/hotels?search=Palace').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { total: 1 } },
    })
  })

  test('can search hotels by location', async ({ client }) => {
    await HotelFactory.merge({ location: 'Paris' }).create()
    await HotelFactory.merge({ location: 'London' }).create()

    const response = await client.get('/hotels?search=Paris').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { total: 1 } },
    })
  })

  test('returns empty list when no hotels match search', async ({ client }) => {
    await HotelFactory.createMany(3)

    const response = await client.get('/hotels?search=NonExistent').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { total: 0 } },
    })
  })

  test('returns empty results for non-matching search', async ({ client }) => {
    await HotelFactory.createMany(5)

    const response = await client.get('/hotels?search=xyznonexistent').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { total: 0 } },
    })
  })

  test('defaults to page 1 when invalid page', async ({ client }) => {
    await HotelFactory.createMany(3)

    const response = await client.get('/hotels?page=-1').withInertia()

    response.assertStatus(200)
    response.assertInertiaPropsContains({
      hotels: { meta: { currentPage: 1 } },
    })
  })

  test('can sort hotels by created_at', async ({ client, assert }) => {
    const hotel1 = await HotelFactory.merge({ name: 'First Hotel' }).create()
    const hotel2 = await HotelFactory.merge({ name: 'Second Hotel' }).create()

    const response = await client.get('/hotels?sort=created_at&order=asc').withInertia()

    response.assertStatus(200)
    const props = response.inertiaProps as any
    const data = props.hotels.data
    assert.isTrue(data.length >= 2)
    const firstIndex = data.findIndex((h: any) => h.id === hotel1.id)
    const secondIndex = data.findIndex((h: any) => h.id === hotel2.id)
    assert.isTrue(firstIndex < secondIndex)
  })
})
