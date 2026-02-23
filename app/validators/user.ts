import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    pseudo: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().trim().email().normalizeEmail().optional(),
    password: vine.string().minLength(8).maxLength(255).optional(),
  })
)
