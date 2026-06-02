# Haett — Partner Management Platform

A full-stack partner/affiliate management system with application workflows, discount code generation, role-based dashboards, and admin moderation.

## Features

- **Authentication & Authorization** — JWT-based login/register with role-based access (USER / ADMIN)
- **Partner Application Flow** — Apply, pending review, approval, rejection with reapply capability
- **Admin Review Panel** — Tab-based review queue with approve/reject actions and inline rejection reason form
- **Discount Code System** — Auto-generated discount codes on approval, toggle active/inactive, usage tracking
- **Partner Dashboard** — Stats overview (codes, uses, discount given) with copy-to-clipboard UX
- **Responsive Design** — Mobile-friendly sidebar, adaptive layouts, touch targets
- **Optimistic UX** — Skeleton loaders, toast notifications, instant feedback
- **State Machine Architecture** — Single-page orchestrator handling all application states

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind v4 |
| State | Zustand (auth), TanStack React Query (server) |
| Forms | react-hook-form + Zod validation |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma (PostgreSQL) |
| Auth | bcryptjs + jsonwebtoken |
| Validation | Zod |

## Architecture Overview

```
Browser → Vite Dev Server (proxy /api)
              ↓
   Express REST API (:3000)
              ↓
         Prisma ORM
              ↓
        PostgreSQL
```

The frontend is a single-page application with a state-machine pattern (`PartnerPage.tsx`) that computes the current view from auth status, role, and application data:

```
visitor → apply → pending → approved
                         ↘ rejected → reapply → pending
              admin → admin review panel
```

## Project Structure

```
haett/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Admin + test user seeder
│   └── src/
│       ├── app.ts               # Express entry point
│       ├── config/env.ts        # Environment config loader
│       ├── controllers/         # Route handlers
│       ├── middleware/          # Auth, error, validation
│       ├── routes/              # API route definitions
│       ├── services/            # Business logic
│       ├── utils/               # JWT, password, errors, response
│       └── validations/         # Zod schemas
├── frontend/
│   └── src/
│       ├── api/                 # Axios client + API functions
│       ├── components/
│       │   ├── common/          # Route guards, PageContainer
│       │   ├── feedback/        # EmptyState, ErrorFallback
│       │   ├── layout/          # AppLayout, AppSidebar, AppHeader
│       │   └── ui/              # Button, Input, Card, Badge, etc.
│       ├── features/
│       │   ├── admin/           # Admin review panel components
│       │   ├── dashboard/       # Partner dashboard components
│       │   └── partner/         # Application form, status views
│       ├── hooks/               # React Query hooks
│       ├── lib/utils.ts         # Utility functions
│       ├── pages/               # Page components
│       ├── providers/           # Query + app providers
│       ├── routes/              # Route configuration
│       ├── store/               # Zustand auth store
│       ├── styles/              # Tailwind theme config
│       ├── types/               # TypeScript interfaces
│       └── utils/constants.ts   # Routes, query keys
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Edit DATABASE_URL and secrets
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing tokens |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) |
| `ADMIN_SEED_EMAIL` | Admin seed email |
| `ADMIN_SEED_PASSWORD` | Admin seed password |
| `USER_SEED_EMAIL` | Test user seed email |
| `USER_SEED_PASSWORD` | Test user seed password |

### Frontend

No environment variables required. The API proxy is configured in `vite.config.ts`.

## Prisma Migration Steps

```bash
cd backend
npx prisma migrate dev --name init      # Create initial migration
npx prisma db seed                       # Seed admin + test user
npx prisma studio                        # (Optional) DB GUI
```

## Seed Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@example.com` | `Admin@123456` |
| Test User | `user@example.com` | `User@123456` |

## API Overview

All endpoints are prefixed with `/api/v1`.

### Auth
- `POST /auth/register` — Create account
- `POST /auth/login` — Login

### Users
- `GET /users/me` — Current user profile

### Partner Applications
- `POST /partner-applications` — Submit application
- `GET /partner-applications/me` — Get my application
- `PUT /partner-applications/reapply` — Reapply after rejection

### Admin
- `GET /admin/partner-applications?status=PENDING` — List applications
- `PATCH /admin/partner-applications/:id/approve` — Approve
- `PATCH /admin/partner-applications/:id/reject` — Reject
- `PATCH /admin/discount-codes/:id/toggle` — Toggle code

### Dashboard
- `GET /partner-dashboard` — Partner stats + codes

### Response Format

```json
{
  "success": true,
  "message": "...",
  "data": { }
}
```

Errors return `{ "success": false, "message": "...", "errors": {} }` with appropriate HTTP status codes.

## Screenshots

*(Capture these for submission)*

1. Landing page with hero, benefits, and how-it-works sections
2. Login / Register forms
3. Partner application form (apply state)
4. Pending review status view
5. Rejected application with reason and reapply button
6. Approved partner dashboard with stats grid
7. Discount code list with copy-to-clipboard
8. Admin review panel with tab filters
9. Admin inline reject form
10. Approved application card showing discount code with toggle

## Future Improvements

- Email notifications on application status change
- Pagination for admin application list
- Discount code usage analytics and charts
- Multi-language support
- OAuth2 social login
- Webhook notifications for partner events
- API rate limiting and request logging
- Automated E2E tests with Playwright
- CI/CD pipeline configuration
- Docker Compose for one-command setup

## Troubleshooting

**Database connection refused** — Ensure PostgreSQL is running and `DATABASE_URL` is correct.

**Migration errors** — Run `npx prisma migrate reset` to reset and re-seed.

**Frontend API errors** — Ensure the backend is running on port 3000 and Vite proxy is configured.

**401 on authenticated routes** — Clear localStorage (`partner-portal-auth`) and re-login.

**Port already in use** — Change `PORT` in `.env` or kill the existing process.
