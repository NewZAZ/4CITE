import type { HttpContext } from '@adonisjs/core/http'
import Booking from '#models/booking'
import Hotel from '#models/hotel'
import { createBookingValidator, updateBookingValidator } from '#validators/booking'
import { DateTime } from 'luxon'

export default class BookingsController {
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user!
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    let query = Booking.query().preload('hotel').preload('user')

    if (user.role === 'admin') {
      const search = request.input('search', '')
      if (search) {
        const numericSearch = Number(search)
        if (!Number.isNaN(numericSearch) && Number.isInteger(numericSearch) && numericSearch > 0) {
          query.where('id', numericSearch)
        } else {
          query.whereHas('user', (userQuery) => {
            userQuery
              .where('pseudo', 'ilike', `%${search}%`)
              .orWhere('email', 'ilike', `%${search}%`)
          })
        }
      }
    } else {
      query.where('userId', user.id)
    }

    query.orderBy('createdAt', 'desc')

    const bookings = await query.paginate(page, limit)

    return inertia.render('bookings/index', {
      bookings: bookings.serialize(),
      filters: { search: request.input('search', '') },
    })
  }

  async create({ inertia, request }: HttpContext) {
    const hotelId = request.input('hotelId')
    let hotel = null
    if (hotelId) {
      hotel = await Hotel.find(hotelId)
    }
    const hotels = await Hotel.query().orderBy('name', 'asc')
    return inertia.render('bookings/create', {
      hotels: hotels.map((h) => h.serialize()),
      selectedHotel: hotel?.serialize() ?? null,
    })
  }

  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(createBookingValidator)
    const user = auth.user!

    const checkIn = DateTime.fromJSDate(data.checkIn)
    const checkOut = DateTime.fromJSDate(data.checkOut)

    if (checkIn < DateTime.now().startOf('day')) {
      session.flash('errors', { checkIn: 'Check-in date must be in the future' })
      return response.redirect().back()
    }

    if (checkOut <= checkIn) {
      session.flash('errors', { checkOut: 'Check-out must be after check-in' })
      return response.redirect().back()
    }

    const hotel = await Hotel.findOrFail(data.hotelId)

    await Booking.create({
      userId: user.id,
      hotelId: hotel.id,
      checkIn: checkIn,
      checkOut: checkOut,
      status: 'confirmed',
    })

    return response.redirect().toRoute('bookings.index')
  }

  async edit({ inertia, params, auth, response }: HttpContext) {
    const booking = await Booking.query().where('id', params.id).preload('hotel').firstOrFail()

    if (auth.user!.role !== 'admin' && booking.userId !== auth.user!.id) {
      return response.forbidden({ error: 'Access denied' })
    }

    return inertia.render('bookings/edit', { booking: booking.serialize() })
  }

  async update({ request, response, params, auth, session }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)

    if (auth.user!.role !== 'admin' && booking.userId !== auth.user!.id) {
      return response.forbidden({ error: 'Access denied' })
    }

    const data = await request.validateUsing(updateBookingValidator)

    if (data.checkIn) {
      const checkIn = DateTime.fromJSDate(data.checkIn)
      if (checkIn < DateTime.now().startOf('day')) {
        session.flash('errors', { checkIn: 'Check-in date must be in the future' })
        return response.redirect().back()
      }
      booking.checkIn = checkIn
    }

    if (data.checkOut) {
      const checkOut = DateTime.fromJSDate(data.checkOut)
      const currentCheckIn = data.checkIn ? DateTime.fromJSDate(data.checkIn) : booking.checkIn
      if (checkOut <= currentCheckIn) {
        session.flash('errors', { checkOut: 'Check-out must be after check-in' })
        return response.redirect().back()
      }
      booking.checkOut = checkOut
    }

    if (data.status) {
      booking.status = data.status
    }

    await booking.save()
    return response.redirect().toRoute('bookings.index')
  }

  async destroy({ response, params, auth }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)

    if (auth.user!.role !== 'admin' && booking.userId !== auth.user!.id) {
      return response.forbidden({ error: 'Access denied' })
    }

    await booking.delete()
    return response.redirect().toRoute('bookings.index')
  }
}
