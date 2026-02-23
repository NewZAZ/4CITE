import vine from '@vinejs/vine'

export const createHotelValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    location: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().minLength(1),
    pictureList: vine.array(vine.string().url()).optional(),
  })
)

export const updateHotelValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    location: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().minLength(1).optional(),
    pictureList: vine.array(vine.string().url()).optional(),
  })
)
