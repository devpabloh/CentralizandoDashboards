# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Backend-only Node.js/Express/TypeScript REST API (early stage). Planned features include JWT authentication, Redis caching, email via Resend, and Prisma ORM with SQLite.

## Development Commands

All commands run from `backend/`:

```bash
npm run dev          # Start with tsx watch (hot-reload)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled output
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier formatting

# Database (Prisma)
npm run db:migrate   # Run migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database

# Tests
npm run test                  # Run all tests
npm run test:watch            # Watch mode
npm run test:coverage         # With coverage report
```

Run a single test file:
```bash
npx jest path/to/test.spec.ts
```

## Docker

Development (hot-reload, port 3333):
```bash
docker-compose -f docker-compose.dev.yml up
```

Production:
```bash
docker-compose up
```

> **Note:** The compose files reference `./apps/backend/` but the actual backend path is `./backend/`. This needs to be corrected if using Docker.

## Architecture

The backend follows a layered pattern inside `backend/src/`:

```
src/
├── server.ts          # Entry point
├── app.ts             # Express app setup
├── env/
│   ├── index.ts       # Loads and exports validated env vars
│   └── schema.ts      # Zod schema for environment variables
├── modules/           # Feature modules (e.g., auth/)
│   └── <module>/
│       ├── controller.ts   # HTTP handlers
│       ├── dto.ts          # Input/output types (Zod schemas)
│       ├── service.ts      # Business logic
│       └── repository.ts   # Database access (Prisma)
└── shared/
    ├── errors/
    │   └── AppError.ts     # Custom error class (statusCode defaults to 400)
    ├── middlewares/
    │   └── errorHandler.ts # Global Express error handler
    └── tests/
        └── setup.ts        # Jest global setup (referenced but not yet created)
```

### Key Conventions

- **Path aliases:** Use `@modules/` and `@shared/` (mapped in tsconfig and jest config)
- **ES Modules:** `"type": "module"` — use `.js` extensions in imports when necessary
- **Error handling:** Throw `AppError` for expected errors; the global `errorHandler` middleware distinguishes `AppError` from `ZodError` from generic errors
- **Validation:** Use Zod schemas in `dto.ts`; `ZodError` is caught by the error handler and returns 422
- **Env vars:** Access via `src/env/index.ts` — never use `process.env` directly

### Code Style

- No semicolons, single quotes, trailing commas (all), print width 100
- Coverage thresholds enforced at 80% (branches, functions, lines, statements)
- Coverage excludes `index.ts`, `server.ts`, and `.d.ts` files
