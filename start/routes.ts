import router from '@adonisjs/core/services/router'
import app from '@adonisjs/core/services/app'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const HotelsController = () => import('#controllers/hotels_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const UsersController = () => import('#controllers/users_controller')

// Home
router.on('/').renderInertia('home')

// API Documentation
router.get('/api-docs', async ({ response }) => {
  const path = app.publicPath('api-docs.html')
  return response.download(path)
})

// Auth
router.get('/login', [AuthController, 'showLogin']).as('auth.login.show')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.get('/register', [AuthController, 'showRegister']).as('auth.register.show')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/logout', [AuthController, 'logout']).use(middleware.auth()).as('auth.logout')

// Hotels (public)
router.get('/hotels', [HotelsController, 'index']).as('hotels.index')

// Hotels (admin only) - create route BEFORE :id to avoid capture
router
  .get('/hotels/create', [HotelsController, 'create'])
  .use([middleware.auth(), middleware.role({ roles: ['admin'] })])
  .as('hotels.create')
router
  .post('/hotels', [HotelsController, 'store'])
  .use([middleware.auth(), middleware.role({ roles: ['admin'] })])
  .as('hotels.store')
router
  .get('/hotels/:id/edit', [HotelsController, 'edit'])
  .use([middleware.auth(), middleware.role({ roles: ['admin'] })])
  .as('hotels.edit')
router
  .put('/hotels/:id', [HotelsController, 'update'])
  .use([middleware.auth(), middleware.role({ roles: ['admin'] })])
  .as('hotels.update')
router
  .delete('/hotels/:id', [HotelsController, 'destroy'])
  .use([middleware.auth(), middleware.role({ roles: ['admin'] })])
  .as('hotels.destroy')

// Hotels (public - show after admin routes)
router.get('/hotels/:id', [HotelsController, 'show']).as('hotels.show')

// Bookings (auth required)
router.get('/bookings', [BookingsController, 'index']).use(middleware.auth()).as('bookings.index')
router
  .get('/bookings/create', [BookingsController, 'create'])
  .use(middleware.auth())
  .as('bookings.create')
router.post('/bookings', [BookingsController, 'store']).use(middleware.auth()).as('bookings.store')
router
  .get('/bookings/:id/edit', [BookingsController, 'edit'])
  .use(middleware.auth())
  .as('bookings.edit')
router
  .put('/bookings/:id', [BookingsController, 'update'])
  .use(middleware.auth())
  .as('bookings.update')
router
  .delete('/bookings/:id', [BookingsController, 'destroy'])
  .use(middleware.auth())
  .as('bookings.destroy')

// Users (auth required)
router
  .get('/users', [UsersController, 'index'])
  .use([middleware.auth(), middleware.role({ roles: ['admin', 'employee'] })])
  .as('users.index')
router.get('/users/:id', [UsersController, 'show']).use(middleware.auth()).as('users.show')
router.get('/users/:id/edit', [UsersController, 'edit']).use(middleware.auth()).as('users.edit')
router.put('/users/:id', [UsersController, 'update']).use(middleware.auth()).as('users.update')
router.delete('/users/:id', [UsersController, 'destroy']).use(middleware.auth()).as('users.destroy')

// Legal pages
router.on('/legal/privacy').renderInertia('legal/privacy')
router.on('/legal/terms').renderInertia('legal/terms')
