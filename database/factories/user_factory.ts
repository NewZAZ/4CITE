import Factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { BookingFactory } from './booking_factory.js'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    pseudo: faker.internet.username(),
    password: 'Test@1234',
    role: 'user' as const,
  }
})
  .state('admin', (user) => (user.role = 'admin'))
  .state('employee', (user) => (user.role = 'employee'))
  .relation('bookings', () => BookingFactory)
  .build()
