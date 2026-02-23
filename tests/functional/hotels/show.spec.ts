import { test } from '@japa/runner'
import { HotelFactory } from '#database/factories/hotel_factory'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Hotels - Show', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('can view a hotel without auth', async ({ client }) => {
    const hotel = await HotelFactory.create()

    const response = await client.get(`/hotels/${hotel.id}`).withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('hotels/show')
    response.assertInertiaPropsContains({
      hotel: { id: hotel.id, name: hotel.name },
    })
  })

  test('returns 404 for non-existent hotel', async ({ client }) => {
    const response = await client.get('/hotels/999')

    response.assertStatus(404)
  })
})
