import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Hotel from '#models/hotel'
import Booking from '#models/booking'
import { DateTime } from 'luxon'

export default class BookingSeeder extends BaseSeeder {
  async run() {
    const testUser = await User.findBy('email', 'user@akkor.com')
    const admin = await User.findBy('email', 'admin@akkor.com')
    const hotels = await Hotel.all()

    if (!testUser || !admin || hotels.length === 0) {
      console.log(
        'Skipping booking seeder: users or hotels not found. Run user and hotel seeders first.'
      )
      return
    }

    const existingBookings = await Booking.query().where('userId', testUser.id).first()
    if (existingBookings) {
      console.log('Bookings already exist, skipping.')
      return
    }

    await Booking.createMany([
      {
        userId: testUser.id,
        hotelId: hotels[0].id,
        checkIn: DateTime.now().plus({ days: 7 }),
        checkOut: DateTime.now().plus({ days: 10 }),
        status: 'confirmed',
      },
      {
        userId: testUser.id,
        hotelId: hotels[2].id,
        checkIn: DateTime.now().plus({ days: 30 }),
        checkOut: DateTime.now().plus({ days: 35 }),
        status: 'pending',
      },
      {
        userId: testUser.id,
        hotelId: hotels[4].id,
        checkIn: DateTime.now().minus({ days: 10 }),
        checkOut: DateTime.now().minus({ days: 5 }),
        status: 'confirmed',
      },
      {
        userId: admin.id,
        hotelId: hotels[1].id,
        checkIn: DateTime.now().plus({ days: 14 }),
        checkOut: DateTime.now().plus({ days: 18 }),
        status: 'confirmed',
      },
      {
        userId: admin.id,
        hotelId: hotels[6].id,
        checkIn: DateTime.now().plus({ days: 60 }),
        checkOut: DateTime.now().plus({ days: 67 }),
        status: 'pending',
      },
    ])
  }
}
