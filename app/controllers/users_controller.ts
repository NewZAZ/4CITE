import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Booking from '#models/booking'
import { updateUserValidator } from '#validators/user'

export default class UsersController {
  async index({ inertia, auth, response }: HttpContext) {
    const currentUser = auth.user!
    if (!['admin', 'employee'].includes(currentUser.role)) {
      return response.forbidden({ error: 'Access denied' })
    }

    const users = await User.query().orderBy('createdAt', 'desc')
    return inertia.render('users/index', {
      users: users.map((u) => u.serialize()),
    })
  }

  async show({ inertia, params, auth, response }: HttpContext) {
    const currentUser = auth.user!
    const targetId = Number(params.id)

    if (currentUser.id !== targetId && !['admin', 'employee'].includes(currentUser.role)) {
      return response.forbidden({ error: 'Access denied' })
    }

    const user = await User.findOrFail(targetId)

    const bookings = await Booking.query()
      .where('userId', targetId)
      .preload('hotel')
      .orderBy('createdAt', 'desc')
      .limit(5)

    const totalBookings = await Booking.query().where('userId', targetId).count('* as total')

    return inertia.render('users/show', {
      targetUser: user.serialize(),
      recentBookings: bookings.map((b) => b.serialize()),
      totalBookings: Number(totalBookings[0].$extras.total),
    })
  }

  async edit({ inertia, params, auth, response }: HttpContext) {
    const currentUser = auth.user!
    const targetId = Number(params.id)

    if (currentUser.id !== targetId && currentUser.role !== 'admin') {
      return response.forbidden({ error: 'Access denied' })
    }

    const user = await User.findOrFail(targetId)
    return inertia.render('users/edit', { targetUser: user.serialize() })
  }

  async update({ request, response, params, auth }: HttpContext) {
    const currentUser = auth.user!
    const targetId = Number(params.id)

    if (currentUser.id !== targetId && currentUser.role !== 'admin') {
      return response.forbidden({ error: 'Access denied' })
    }

    const user = await User.findOrFail(targetId)
    const data = await request.validateUsing(updateUserValidator)

    if (data.email && data.email !== user.email) {
      const existing = await User.findBy('email', data.email)
      if (existing) {
        return response.unprocessableEntity({
          errors: { email: 'Email already taken' },
        })
      }
    }

    user.merge(data)
    await user.save()
    return response.redirect().toRoute('users.show', { id: user.id })
  }

  async destroy({ response, params, auth }: HttpContext) {
    const currentUser = auth.user!
    const targetId = Number(params.id)

    if (currentUser.id !== targetId && currentUser.role !== 'admin') {
      return response.forbidden({ error: 'Access denied' })
    }

    const user = await User.findOrFail(targetId)
    await user.delete()

    if (currentUser.id === targetId) {
      await auth.use('web').logout()
      return response.redirect().toRoute('auth.login.show')
    }

    return response.redirect().toRoute('users.index')
  }
}
