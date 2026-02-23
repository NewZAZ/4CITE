import Factory from '@adonisjs/lucid/factories'
import Booking from '#models/booking'
import { DateTime } from 'luxon'

export const BookingFactory = Factory.define(Booking, ({ faker }) => {
  const checkIn = DateTime.now().plus({ days: faker.number.int({ min: 5, max: 30 }) })
  const checkOut = checkIn.plus({ days: faker.number.int({ min: 1, max: 14 }) })

  return {
    checkIn,
    checkOut,
    status: 'confirmed',
  }
}).build()
