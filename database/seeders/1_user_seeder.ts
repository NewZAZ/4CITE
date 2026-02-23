import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.updateOrCreateMany('email', [
      {
        email: 'admin@akkor.com',
        pseudo: 'Admin',
        password: 'Admin@1234',
        role: 'admin',
      },
      {
        email: 'employee@akkor.com',
        pseudo: 'Employee',
        password: 'Employee@1234',
        role: 'employee',
      },
      {
        email: 'user@akkor.com',
        pseudo: 'TestUser',
        password: 'User@1234',
        role: 'user',
      },
    ])
  }
}
