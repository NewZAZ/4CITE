# Project Context: Akkor Hotel (4CITE)

## AI Agent Rules

When working on this project, follow these conventions:

1. **AdonisJS 6 conventions** - Controllers, models, validators, middleware follow AdonisJS 6 patterns. Use `node ace` CLI for scaffolding.
2. **Inertia.js rendering** - All pages are React components rendered via Inertia. Use `inertia.render()` in controllers, not JSON API responses.
3. **VineJS validation** - All request validation uses VineJS schemas defined in `app/validators/`.
4. **Lucid ORM** - All database operations go through Lucid models with relationships and eager loading (`preload()`).
5. **Role-based access** - Three roles: `admin`, `employee`, `user`. Enforce via `role_middleware` in routes.
6. **Session-based auth** - Web interface uses session/cookie authentication. API tokens exist for programmatic access.
7. **Tailwind styling** - Use the custom color palette (Ivory, Cream, Charcoal, Brass, Warm Gray). Use existing utilities (`card-shadow`, `gold-line`).
8. **TypeScript strict** - Both backend and frontend are TypeScript. Maintain type safety.
9. **Test with existing frameworks** - Backend: Japa. Frontend: Vitest + React Testing Library. E2E: Playwright.
10. **PostgreSQL 13+** - Use pg-compatible SQL. Migrations via `node ace make:migration`.

## Tech Stack

- **Backend:** AdonisJS 6.18.0 (Node.js TypeScript)
- **Frontend:** React 19 + Inertia.js 2.3 + Vite 6
- **Database:** PostgreSQL 13+ via Lucid ORM 21.6
- **Styling:** Tailwind CSS 4.1 with custom theme
- **Auth:** @adonisjs/auth 9.4 (session + tokens)
- **Validation:** VineJS 3.0
- **Backend Tests:** Japa 4.2
- **Frontend Tests:** Vitest 4.0 + @testing-library/react 16.3
- **E2E Tests:** Playwright 1.58
- **CI/CD:** GitHub Actions

## Architecture

Monolithic full-stack app with SSR via Inertia.js. Single repo, single deployment.

```
4CITE/
├── app/                    # Backend (AdonisJS)
│   ├── controllers/        # AuthController, HotelsController, BookingsController, UsersController
│   ├── models/             # User, Hotel, Booking (Lucid ORM)
│   ├── middleware/          # auth_middleware, role_middleware, container_bindings_middleware
│   ├── validators/         # VineJS schemas for all requests
│   └── exceptions/         # Custom error handler (renders Inertia error pages)
├── config/                 # AdonisJS configs (auth, database, inertia, session, shield, cors, vite)
├── database/
│   ├── migrations/         # PostgreSQL schema migrations
│   ├── seeders/            # UserSeeder, HotelSeeder, BookingSeeder
│   └── factories/          # Model factories for testing
├── start/
│   ├── routes.ts           # All HTTP routes (public, auth, admin, employee)
│   └── kernel.ts           # Middleware registration order
├── inertia/                # Frontend (React)
│   ├── app/                # Entry points: app.tsx (client), ssr.tsx (SSR)
│   ├── pages/              # Page components organized by domain
│   │   ├── auth/           # login.tsx, register.tsx
│   │   ├── hotels/         # index.tsx, show.tsx, create.tsx, edit.tsx
│   │   ├── bookings/       # index.tsx, create.tsx, edit.tsx
│   │   ├── users/          # index.tsx, show.tsx, edit.tsx
│   │   ├── errors/         # not_found.tsx, server_error.tsx
│   │   ├── legal/          # privacy.tsx, terms.tsx
│   │   └── home.tsx
│   ├── components/         # layout.tsx, pagination.tsx, carousel.tsx
│   ├── css/                # app.css (Tailwind + custom theme)
│   └── __tests__/          # Vitest tests with Inertia mocks
├── tests/                  # Backend tests (Japa)
│   ├── unit/               # Model tests
│   └── functional/         # Controller/route integration tests
├── e2e/                    # Playwright E2E tests
├── .github/workflows/      # pr.yml (PR checks), main.yml (deploy pipeline)
└── docker-compose.yml      # PostgreSQL 13 container
```

## Data Models

### User
- Fields: `id`, `pseudo`, `email`, `password` (scrypt), `role` (enum: user/admin/employee), `createdAt`, `updatedAt`
- Relations: `hasMany` Booking
- Auth: session-based (web guard) + token-based (api guard)

### Hotel
- Fields: `id`, `name`, `location`, `description`, `pictureList` (JSON array of URLs), `createdAt`, `updatedAt`
- Relations: `hasMany` Booking

### Booking
- Fields: `id`, `userId` (FK→User), `hotelId` (FK→Hotel), `checkIn` (date), `checkOut` (date), `status` (pending/confirmed/cancelled), `createdAt`, `updatedAt`
- Relations: `belongsTo` User, `belongsTo` Hotel

## Routes

**Public:** `/` (home), `/login`, `/register`, `GET /hotels`, `GET /hotels/:id`, `/legal/*`

**Authenticated:** `/logout`, `/bookings` (CRUD), `/users/:id` (view/edit/delete)

**Admin only:** `/hotels/create`, `/hotels/:id/edit`, `DELETE /hotels/:id`

**Admin + Employee:** `GET /users` (list all users)

## Authentication & Authorization

- Web auth: session/cookie via `@adonisjs/auth` web guard
- API auth: database access tokens via api guard
- Password hashing: scrypt
- CSRF: enabled via `@adonisjs/shield`
- Role middleware: checks `user.role` against allowed roles array, returns 403 if unauthorized

## Frontend Patterns

- Forms use Inertia's `useForm` hook (state, submit, errors)
- Navigation via Inertia `Link` components (SPA-like)
- Flash messages from server shared via Inertia config (`config/inertia.ts`)
- Layout component wraps all pages with navbar, user dropdown, role-based links

### Custom Design System
- **Colors:** Ivory `#FFFEF7`, Cream `#FFF8E7`, Charcoal `#2C2C2C`, Brass `#C9A84C`, Warm Gray `#8B8680`, Emerald `#065F46`, Rose `#9F1239`
- **Fonts:** Cormorant Garamond (display), Outfit (body)
- **Utilities:** `card-shadow`, `gold-line`, `hero-gradient`
- **Animations:** fadeInUp, shimmer

## Development Commands

```bash
docker-compose up -d           # Start PostgreSQL
npm run dev                    # Dev server with HMR (port 3333)
node ace migration:run         # Run migrations
node ace db:seed               # Seed test data
npm test                       # Backend tests (Japa)
npm run test:frontend          # Frontend tests (Vitest)
npm run test:e2e               # E2E tests (Playwright)
npm run lint                   # ESLint
npm run typecheck              # TypeScript check
npm run build                  # Production build
```

## Environment Variables

```
TZ=UTC  PORT=3333  HOST=localhost  LOG_LEVEL=info
APP_KEY=<generated>  NODE_ENV=development  SESSION_DRIVER=cookie
DB_HOST=127.0.0.1  DB_PORT=5432  DB_USER=root  DB_PASSWORD=root  DB_DATABASE=app
```

## Test Accounts (Seeded)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@akkor.com | Admin@1234 |
| Employee | employee@alors.com | Employee@1234 |
| User | user@akkor.com | User@1234 |

## CI/CD

- **PR pipeline** (`pr.yml`): lint → typecheck → backend tests → frontend tests
- **Main pipeline** (`main.yml`): all PR checks → security audit → production build → deploy
- Both use PostgreSQL 13 service container + Node.js 20
