# Akkor Hotel -- 4CITE

Akkor Hotel is a full-stack hotel booking platform built with AdonisJS and React. Users can browse hotels, make bookings, and manage their accounts. Administrators have full access to manage hotels, bookings, and users. Employees can view user listings alongside standard user capabilities.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | AdonisJS 6 (Node.js)             |
| Frontend   | React 19 + Inertia.js            |
| Database   | PostgreSQL via Lucid ORM          |
| Styling    | Tailwind CSS 4                    |
| Build      | Vite 6 with SSR                   |
| Language   | TypeScript                        |
| Testing    | Japa (backend)                    |
| CI/CD      | GitHub Actions                    |

---

## Prerequisites

- **Node.js** 20 or higher
- **npm**
- **PostgreSQL** 13 or higher (or **Docker** + **Docker Compose**)

---

## Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd 4CITE
```

2. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and set your database credentials (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`) along with `APP_KEY`.

3. **Install dependencies**

```bash
npm install
```

4. **Start the database**

If you do not have a local PostgreSQL instance, use Docker Compose:

```bash
docker-compose up -d
```

5. **Run migrations and seed the database**

```bash
node ace migration:run
node ace db:seed
```

---

## Running the Application

### Development

```bash
npm run dev
```

This starts the AdonisJS server with HMR via Vite. The application is available at `http://localhost:3333` by default.

### Production

```bash
npm run build
npm start
```

### Tests

```bash
# Backend tests (unit + functional)
npm test

# Frontend tests
npm run test:frontend

# End-to-end tests
npm run test:e2e
```

---

## Default Accounts

The database seeder creates the following accounts for development and testing:

| Role     | Email              | Password      |
|----------|--------------------|---------------|
| Admin    | admin@akkor.com    | Admin@1234    |
| Employee | employee@akkor.com | Employee@1234 |
| User     | user@akkor.com     | User@1234     |

---

## Roles and Permissions

| Role       | Capabilities                                                                 |
|------------|------------------------------------------------------------------------------|
| **admin**    | Full access: manage hotels, manage all bookings, manage all users          |
| **employee** | Browse hotels, manage own bookings, view user listings                     |
| **user**     | Browse hotels, manage own bookings                                         |

---

## API Documentation

When the server is running, API documentation is available at:

- **Swagger UI**: `/api-docs`
- **OpenAPI 3.0 spec**: `/swagger.yaml`

---

## Project Structure

```
4CITE/
├── app/
│   ├── controllers/          # Route controllers (auth, hotels, bookings, users)
│   ├── exceptions/           # Error handlers
│   ├── middleware/            # Auth, role, and container bindings middleware
│   ├── models/               # Lucid ORM models (user, hotel, booking)
│   └── validators/           # VineJS request validators
├── config/                   # Application configuration (database, auth, inertia, vite, etc.)
├── database/
│   ├── factories/            # Model factories for testing
│   ├── migrations/           # Database schema migrations
│   └── seeders/              # Database seeders (users, hotels, bookings)
├── inertia/
│   ├── app/                  # Client and SSR entry points
│   ├── components/           # Shared React components (layout, pagination)
│   ├── css/                  # Global styles (Tailwind CSS)
│   └── pages/                # Inertia page components
│       ├── auth/             #   Login, register
│       ├── bookings/         #   Booking CRUD pages
│       ├── errors/           #   404, 500 error pages
│       ├── hotels/           #   Hotel CRUD pages
│       └── users/            #   User management pages
├── start/
│   ├── env.ts                # Environment variable validation
│   ├── kernel.ts             # Middleware kernel
│   └── routes.ts             # Route definitions
├── tests/
│   ├── bootstrap.ts          # Test setup
│   ├── functional/           # Functional / integration tests
│   │   ├── auth/             #   Register, login
│   │   ├── bookings/         #   Booking CRUD
│   │   ├── hotels/           #   Hotel CRUD
│   │   └── users/            #   User CRUD
│   └── unit/                 # Unit tests (models)
├── .github/
│   └── workflows/            # CI/CD pipelines
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## CI/CD

Two GitHub Actions pipelines are configured under `.github/workflows/`:

### `pr.yml` -- Pull Request Pipeline

Triggered on every pull request targeting `master`. Runs:

1. Dependency installation
2. Linting (`npm run lint`)
3. Type checking (`npm run typecheck`)
4. Tests (`npm test`)

### `main.yml` -- Main Pipeline

Triggered on every push to `master`. Runs:

1. **Test job**: runs the test suite and a security audit (`npm audit`)
2. **Build job**: compiles the production build (`node ace build`)
3. **Deploy job**: deploys the application

Both pipelines use a PostgreSQL 13 service container and Node.js 20.

---

## Available Scripts

| Script              | Command                  | Description                                  |
|---------------------|--------------------------|----------------------------------------------|
| `start`            | `node bin/server.js`     | Start the production server                   |
| `build`            | `node ace build`         | Build for production                          |
| `dev`              | `node ace serve --hmr`   | Start the development server with HMR         |
| `test`             | `node ace test`          | Run backend tests                             |
| `test:frontend`    | --                       | Run frontend tests                            |
| `test:e2e`         | --                       | Run end-to-end tests                          |
| `lint`             | `eslint .`               | Lint the codebase                             |
| `format`           | `prettier --write .`     | Format the codebase                           |
| `typecheck`        | `tsc --noEmit`           | Run TypeScript type checking                  |

---

## License

This project is unlicensed (private).
