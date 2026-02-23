import Factory from '@adonisjs/lucid/factories'
import Hotel from '#models/hotel'
import { BookingFactory } from './booking_factory.js'

export const HotelFactory = Factory.define(Hotel, ({ faker }) => {
  return {
    name: faker.company.name(),
    location: faker.location.city(),
    description: faker.lorem.paragraph(),
    pictureList: [faker.image.url()],
  }
})
  .relation('bookings', () => BookingFactory)
  .build()
