import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    pseudo: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(255),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
