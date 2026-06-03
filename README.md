# Haett — Partner Management Portal

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-auth-000000?logo=jsonwebtokens" alt="JWT" />
</p>

A full-stack **Partner Management Portal** built as an intern assessment for Haett. Visitors apply to become affiliate partners, admins review and approve/reject applications, and approved partners receive automatically generated discount codes — all rendered dynamically without page reloads.

**The Partner Lifecycle:** Visitor → Register → Apply → Pending Review → Approved / Rejected → Partner Dashboard (with discount codes)

---

## Features

- **Visitor Landing Page** — Hero section, benefits grid, how-it-works steps, live platform statistics
- **User Registration & Login** — JWT-based authentication with role-based access (USER / ADMIN)
- **Partner Application Form** — Partner type selector, business name, phone, social link, audience size, description (500 char limit with counter)
- **Pending Review State** — Status card with application info and waiting message
- **Rejected Reapplication Flow** — Rejection reason display, prefilled reapplication form, status resets to PENDING
- **Approved Partner Dashboard** — Stats grid (total codes, uses, discounts given), discount code list with copy-to-clipboard
- **Admin Review Panel** — Tab-based filter (All / Pending / Approved / Rejected) with dynamic counts, approve/reject actions, inline rejection form
- **Discount Code Management** — Auto-generated `PRTN-XXXXX` codes on approval, activate/deactivate toggle, usage tracking
- **State Machine Architecture** — Single-page orchestrator renders 9 distinct views based on auth + application state; no page reloads during transitions
- **Toast Notifications** — Real-time feedback via Sonner toast messages for all mutations
- **Protected Routes** — Route guards for USER and ADMIN roles; 401 auto-logout
- **Responsive Design** — Mobile hamburger menu, adaptive layouts, touch-friendly targets

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **TanStack Query v5** | Server state management |
| **Zustand** | Client auth state (persisted to localStorage) |
| **react-hook-form + Zod** | Form validation |
| **Framer Motion** | Page transition animations |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **Axios** | HTTP client |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express** | HTTP server & routing |
| **TypeScript** | Type safety |
| **Prisma** | ORM (PostgreSQL) |
| **PostgreSQL** | Database |
| **jsonwebtoken** | JWT signing & verification |
| **bcryptjs** | Password hashing (12 rounds) |
| **Zod** | Request validation |

---

## Architecture / Flow

The frontend uses a **state machine pattern** in `PartnerPage.tsx` that computes the current view from authentication status, user role, and application data:

```mermaid
flowchart TD
    A[Visitor /partner] -->|Click Apply / Register| B[Register / Login]
    B -->|Authenticated| C{Has Application?}
    C -->|No| D[Application Form]
    C -->|Yes| E{Application Status?}
    D -->|Submit| F[Pending Review]
    E -->|PENDING| F
    E -->|REJECTED| G[Rejected View]
    E -->|APPROVED| H[Approved Dashboard]
    G -->|Click Reapply| D
    F -->|Admin Approves| H
    F -->|Admin Rejects| G
```

**Admin flow (separate navigation):**

```mermaid
flowchart LR
    I[Admin Login] --> J[Review Panel]
    J -->|Tab: Pending| K[Application Cards]
    K -->|Approve| L[Auto-generate Code]
    K -->|Reject| M[Inline Reason Form]
    L --> N[Discount Code Management]
```

### Key design decisions

- **Single `action` endpoint for all partner views** — The `/partner` route is the sole orchestrator. Based on auth + application state, it renders the visitor landing page, application form, pending view, rejected view, approved dashboard, or admin review panel. Sidebar links for partners (`/dashboard`, `/application`, `/codes`) redirect to `/partner` to leverage this state machine.
- **No page reloads during transitions** — React Query cache invalidation and Zustand state changes trigger instant view recomputation.
- **Transaction-safe approvals** — Discount codes are generated inside a Prisma `$transaction` when an admin approves an application, ensuring atomicity.

---

## Screenshots

> Create a `screenshots/` folder in the repository root and place your captured images there. Reference them in the markdown like `![Alt text](screenshots/filename.png)`.

### 1. Visitor Landing Page
*Hero section with "Apply Now" CTA, benefits grid, how-it-works steps, and live platform statistics.*

### 2. Application Form
*Partner type dropdown, business name, phone, social link, audience size, and description with 500-character counter.*

### 3. Pending Review State
*Status card showing business name, partner type, application date, and "Under Review" waiting message.*

### 4. Rejected State
*Red-themed view showing rejection reason from admin, application info, and "Reapply Now" button.*

### 5. Approved Dashboard
*Stats grid (Total Codes, Total Uses, Total Discount Given) and discount code list with copy-to-clipboard.*

### 6. Admin Review Panel
*Tab filters (All / Pending / Approved / Rejected) with dynamic counts, application cards with approve/reject actions.*

### 7. Discount Code Management
*Code list with active/inactive badges, usage counts, and activate/deactivate toggle buttons.*

---

## Setup Instructions

> **Prerequisites:** [Node.js](https://nodejs.org/) (v18+), [PostgreSQL](https://www.postgresql.org/) (v14+), [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/haett-partner-portal.git
cd haett-partner-portal
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` — update `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/partner_management"
```

Create the database (if it doesn't exist):

```bash
psql -U postgres -c "CREATE DATABASE partner_management;"
```

Run migrations and seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### 3. Set up the frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` requests to `http://localhost:3000`.

### Quick start (one-liner summary)

```bash
# Terminal 1 — Backend
cd backend && npm install && npx prisma migrate dev --name init && npx prisma db seed && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/partner_management?schema=public` |
| `JWT_SECRET` | Secret key for JWT signing | `change-this-to-a-secure-random-string` |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `ADMIN_SEED_NAME` | Admin seed name | `Admin` |
| `ADMIN_SEED_EMAIL` | Admin seed email | `admin@example.com` |
| `ADMIN_SEED_PASSWORD` | Admin seed password | `Admin@123456` |
| `USER_SEED_NAME` | Test user seed name | `Test User` |
| `USER_SEED_EMAIL` | Test user seed email | `user@example.com` |
| `USER_SEED_PASSWORD` | Test user seed password | `User@123456` |

### Frontend

No environment variables required. The API proxy is configured in `vite.config.ts` to forward `/api` requests to `http://localhost:3000`.

---

## Test Credentials

After running the seed script, the following accounts are available:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@example.com` | `Admin@123456` |
| **Test User** | `user@example.com` | `User@123456` |

**Admin login:** Navigate to `/admin/login` or click "Admin Login" in the landing page header.

---

## API Overview

All endpoints are prefixed with `/api/v1`. Responses follow a standard format:

```json
{ "success": true, "message": "...", "data": {} }
```

Errors return `{ "success": false, "message": "...", "errors": {} }` with appropriate HTTP status codes.

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/public/platform-stats` | Aggregated platform-wide statistics |

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login, returns JWT |
| `POST` | `/admin/login` | Public | Admin login (enforces ADMIN role) |

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users/me` | JWT | Current user profile |

### Partner Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/partner-applications` | JWT | Submit application |
| `GET` | `/partner-applications/me` | JWT | Get own application |
| `PUT` | `/partner-applications/reapply` | JWT | Reapply after rejection |

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/partner-applications?status=` | JWT+ADMIN | List filtered applications |
| `PATCH` | `/admin/partner-applications/:id/approve` | JWT+ADMIN | Approve + generate discount code |
| `PATCH` | `/admin/partner-applications/:id/reject` | JWT+ADMIN | Reject with reason (min 10 chars) |
| `GET` | `/admin/discount-codes` | JWT+ADMIN | List all discount codes |
| `PATCH` | `/admin/discount-codes/:id/toggle` | JWT+ADMIN | Toggle active/inactive |

### Partner Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/partner-dashboard` | JWT (APPROVED) | Dashboard stats + codes |

---

## Folder Structure

```
haett-partner-portal/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (User, PartnerApplication, DiscountCode)
│   │   └── seed.ts                # Seeds admin + test user from .env
│   └── src/
│       ├── app.ts                 # Express entry point
│       ├── config/env.ts          # Environment variable loader
│       ├── controllers/           # Route handlers
│       ├── interfaces/            # TypeScript type extensions
│       ├── middleware/            # Auth, validation, error handling
│       ├── routes/                # API route definitions
│       ├── services/              # Business logic layer
│       ├── utils/                 # JWT, password hashing, errors, response helpers
│       └── validations/           # Zod request schemas
│
├── frontend/
│   └── src/
│       ├── api/                   # Axios client + endpoint functions
│       ├── components/
│       │   ├── common/            # ProtectedRoute, AdminRoute, LogoutButton
│       │   ├── feedback/          # ErrorBoundary, ErrorFallback, EmptyState
│       │   ├── layout/            # AppLayout, AppSidebar, AppHeader
│       │   └── ui/                # Button, Card, Input, Badge, Select, etc.
│       ├── features/
│       │   ├── admin/             # AdminTabs, ApplicationCard, RejectInlineForm
│       │   ├── dashboard/         # StatsGrid, DiscountCodeList, CopyCodeButton
│       │   └── partner/           # LandingView, ApplicationFormView, PendingView, RejectedView
│       ├── hooks/                 # TanStack Query hooks
│       ├── lib/                   # Utility functions
│       ├── pages/                 # Page-level components
│       ├── providers/             # Query + app providers
│       ├── routes/                # Route configuration
│       ├── store/                 # Zustand auth store (persisted)
│       ├── styles/                # Tailwind entry point + theme
│       ├── types/                 # TypeScript interfaces
│       └── utils/constants.ts     # Route paths, query keys
│
├── screenshots/                   # 📸 Place screenshots here
├── .gitignore
└── README.md
```

---

## Assessment Requirements Coverage

### Authentication & Authorization

- [x] User registration with validation
- [x] User login with JWT
- [x] Persistent sessions (Zustand + localStorage)
- [x] Role-based access control (USER / ADMIN)
- [x] Admin-only routes and middleware
- [x] Protected route guards on frontend
- [x] JWT expiry and auto-logout on 401

### Database Schema (Prisma — PostgreSQL)

- [x] User model: id, name, email (unique), password (hashed), role, createdAt
- [x] PartnerApplication model: partnerType, businessName, phone, socialLink, audienceSize, description, rejectionReason, status (PENDING/APPROVED/REJECTED), appliedAt, approvedAt
- [x] DiscountCode model: code (unique, auto-generated `PRTN-XXXXX`), type, value, usageCount, totalDiscountAmount, active, expiresAt
- [x] Proper relationships: User → PartnerApplication (1:N), PartnerApplication → DiscountCode (1:1)

### Visitor / Landing Page

- [x] Visitor landing with hero section and single CTA
- [x] Benefits grid and how-it-works steps
- [x] Live platform statistics from database
- [x] No fake or placeholder metrics

### Partner Application

- [x] Partner type selector (Affiliate, Influencer, Gym, Corporate, Partner Associate)
- [x] Business/brand name (required)
- [x] Contact phone, social link, audience size fields
- [x] Description with 500-character limit and live counter
- [x] Inline validation errors
- [x] Submit disabled until valid
- [x] No blank submissions (frontend + backend validation)
- [x] Persists to database with PENDING status
- [x] SPA transition to pending view (no page reload)

### Pending State

- [x] Pending status badge with business name, partner type, application date
- [x] Waiting message with email notification info
- [x] Persists after refresh and re-login

### Rejected State

- [x] Rejection reason from admin displayed
- [x] Clear "Not Approved" badge with red theme
- [x] Reapply button opens prefilled form
- [x] Edit and resubmit overwrites old application
- [x] Status resets to PENDING on reapply

### Approved Partner Dashboard

- [x] Real database data (stats grid: total codes, uses, discount given)
- [x] Discount code list with active/inactive badges
- [x] Copy-to-clipboard for each code
- [x] Usage count and discount value per code
- [x] Empty state when no codes assigned

### Admin Review Panel

- [x] Tab-based filter: All / Pending / Approved / Rejected with live counts
- [x] Application cards show: name, email, partner type, business name, social link, audience size, description
- [x] Approve button with loading state
- [x] Reject button with inline reason form (min 10 characters)
- [x] Approve auto-generates discount code (Prisma transaction)
- [x] Approved cards show discount code with activate/deactivate toggle
- [x] All actions persist to database
- [x] Toast notifications after every action
- [x] Optimistic UI updates via React Query

### API Endpoints

- [x] `POST /auth/register` — duplicate email blocked (409)
- [x] `POST /auth/login` — invalid credentials rejected
- [x] `GET /users/me` — returns current user
- [x] `POST /partner-applications` — duplicate pending blocked (409)
- [x] `GET /partner-applications/me` — returns user's application
- [x] `PUT /partner-applications/reapply` — updates rejected application
- [x] `GET /admin/partner-applications` — supports status filter
- [x] `PATCH /admin/partner-applications/:id/approve` — atomic approval + code gen
- [x] `PATCH /admin/partner-applications/:id/reject` — requires reason
- [x] `GET /admin/discount-codes` — all codes with application info
- [x] `PATCH /admin/discount-codes/:id/toggle` — activates/deactivates
- [x] `GET /partner-dashboard` — aggregated stats + codes
- [x] `GET /public/platform-stats` — platform-wide aggregation

### Quality & UX

- [x] No blank screens (ErrorBoundary at root)
- [x] Loading skeletons for all major views
- [x] Loading spinners on submit buttons with double-submit prevention
- [x] Error fallback with retry button
- [x] Meaningful error messages from API
- [x] Toast notifications for all mutations (Sonner)
- [x] Responsive design (mobile hamburger menu, stacked layouts)
- [x] Password show/hide toggle
- [x] Description character counter with color feedback
- [x] All transitions animated (Framer Motion)

---

## Known Limitations

| Issue | Severity | Details |
|-------|----------|---------|
| No email notifications | Medium | UI shows placeholder text about email, but actual email sending is not implemented |
| All applications fetched client-side | Medium | `useAllApplications()` fetches all records then filters by tab; fine for small datasets but should use server-side filtering for production |
| No pagination on admin panel | Low | Application list shows all entries on one page |
| Partner dashboard is read-only for code toggle | Low | Activate/deactivate is available in admin panel only; partner dashboard displays codes but does not allow toggling |
| No direct `userId` on DiscountCode model | Low | DiscountCode links to User through PartnerApplication (normalized relational design) |
| No rate limiting on API | Low | Endpoints have no request throttling — should be added for production |
| Field naming differs from spec | Low | `type`/`value`/`totalDiscountAmount`/`expiresAt` instead of `discountType`/`discountValue`/`totalSavings`/`expiryDate` — consistently used across the app |
| No E2E tests | Medium | Unit and integration tests not included; only manual QA checklist provided |

---

## Troubleshooting

**Database connection refused**
> Ensure PostgreSQL is running and `DATABASE_URL` in `backend/.env` is correct.

**Prisma migration errors**
> Run `npx prisma migrate reset` to drop, recreate, and re-seed the database.

**Frontend API errors**
> Ensure the backend is running on port 3000 and Vite proxy is configured (check `vite.config.ts`).

**401 on authenticated routes**
> Clear localStorage (key: `partner-portal-auth`) and re-login.

**Port already in use**
> Change `PORT` in `backend/.env` or kill the existing process on that port.

---

<p align="center">
  Built with React, Node.js, PostgreSQL & Prisma<br />
  Intern Assessment — Haett
</p>
