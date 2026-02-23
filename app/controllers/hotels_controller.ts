import type { HttpContext } from '@adonisjs/core/http'
import Hotel from '#models/hotel'
import { createHotelValidator, updateHotelValidator } from '#validators/hotel'

export default class HotelsController {
  async index({ inertia, request }: HttpContext) {
    const rawPage = Number(request.input('page', 1))
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1
    const limit = request.input('limit', 10)
    const sort = request.input('sort', 'created_at')
    const order = request.input('order', 'desc')
    const search = request.input('search', '')

    const allowedSorts = ['name', 'location', 'created_at']
    const sortColumn = allowedSorts.includes(sort) ? sort : 'created_at'
    const sortOrder = order === 'asc' ? 'asc' : 'desc'

    const query = Hotel.query()

    if (search) {
      query.where('name', 'ilike', `%${search}%`).orWhere('location', 'ilike', `%${search}%`)
    }

    query.orderBy(sortColumn, sortOrder as 'asc' | 'desc')

    const hotels = await query.paginate(page, limit)

    return inertia.render('hotels/index', {
      hotels: hotels.serialize(),
      filters: { sort, order, search, limit },
    })
  }

  async show({ inertia, params }: HttpContext) {
    const hotel = await Hotel.findOrFail(params.id)
    return inertia.render('hotels/show', { hotel: hotel.serialize() })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('hotels/create')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createHotelValidator)
    await Hotel.create(data)
    return response.redirect().toRoute('hotels.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const hotel = await Hotel.findOrFail(params.id)
    return inertia.render('hotels/edit', { hotel: hotel.serialize() })
  }

  async update({ request, response, params }: HttpContext) {
    const hotel = await Hotel.findOrFail(params.id)
    const data = await request.validateUsing(updateHotelValidator)
    hotel.merge(data)
    await hotel.save()
    return response.redirect().toRoute('hotels.show', { id: hotel.id })
  }

  async destroy({ response, params }: HttpContext) {
    const hotel = await Hotel.findOrFail(params.id)
    await hotel.delete()
    return response.redirect().toRoute('hotels.index')
  }
}
