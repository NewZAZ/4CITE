import vine from '@vinejs/vine'

export const createBookingValidator = vine.compile(
  vine.object({
    hotelId: vine.number().positive(),
    checkIn: vine.date({ formats: ['YYYY-MM-DD'] }),
    checkOut: vine.date({ formats: ['YYYY-MM-DD'] }),
  })
)

export const updateBookingValidator = vine.compile(
  vine.object({
    checkIn: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
    checkOut: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
    status: vine.string().in(['pending', 'confirmed', 'cancelled']).optional(),
  })
)
