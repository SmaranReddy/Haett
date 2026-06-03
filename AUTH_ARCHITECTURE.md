# Authentication Architecture

## Overview

Unified backend auth system with separate admin and user login experiences.
One `User` table, one JWT system — two distinct frontend entry points.

---

## Route Structure

### Public
| Route | Description |
|-------|-------------|
| `/` | Redirects to `/partner` |

### User-Facing
| Route | Auth Required | Description |
|-------|---------------|-------------|
| `/login` | No | User login page |
| `/register` | No | User registration page |
| `/partner` | No | Public landing + partner application |
| `/dashboard` | Yes (USER) | Partner dashboard (redirects to `/partner`) |
| `/application` | Yes (USER) | Application form (redirects to `/partner`) |
| `/codes` | Yes (USER) | Discount codes (redirects to `/partner`) |

### Admin-Facing
| Route | Auth Required | Description |
|-------|---------------|-------------|
| `/admin/login` | No | Admin-only login page |
| `/admin` | Yes (ADMIN) | Admin dashboard |
| `/admin/applications` | Yes (ADMIN) | Application management |
| `/admin/codes` | Yes (ADMIN) | Discount code management |

---

## Middleware Structure

### Backend (`backend/src/middleware/auth.middleware.ts`)

| Middleware | Purpose |
|------------|---------|
| `authenticate` | Validates JWT from `Authorization: Bearer <token>`. Attaches `req.user = { userId, role }`. Throws 401 if missing/invalid. |
| `authorize(...roles)` | Checks `req.user.role` is in allowed roles. Throws 403 if unauthorized. |
| Combination | Admin routes use `authenticate` + `authorize(Role.ADMIN)` for two-layer protection. |

### Frontend Route Guards

| Guard | Purpose |
|-------|---------|
| `ProtectedRoute` | Blocks unauthenticated users → redirects to `/login`. Blocks admins → redirects to `/admin`. |
| `AdminRoute` | Blocks unauthenticated users → redirects to `/admin/login`. Blocks non-admin users → redirects to `/partner`. |

---

## Redirect Flow

```
User visits /login
  ↓
  ┌──────────────────────────────┐
  │  Login via useLogin() hook   │
  │  Calls POST /api/v1/auth/login│
  └──────────────┬───────────────┘
                 ↓
        ┌────────┴────────┐
        │  Check role      │
        ├──────────────────┤
        │  ADMIN → /admin  │
        │  USER  → /partner│
        └──────────────────┘

──────────

User visits /admin/login
  ↓
  ┌──────────────────────────────────────┐
  │  Login via useAdminLogin() hook      │
  │  Calls POST /api/v1/auth/login       │
  │  Checks role === ADMIN on response   │
  └──────────────┬───────────────────────┘
                 ↓
        ┌────────┴────────┐
        │  Is role ADMIN?  │
        ├──────────────────┤
        │  YES → /admin    │
        │  NO  → Error:    │
        │    "Access denied.│
        │     Admin         │
        │     privileges    │
        │     required."    │
        └──────────────────┘
```

---

## Role Rules

| Scenario | Action |
|----------|--------|
| USER visits `/admin/*` | Redirected to `/partner` by `AdminRoute` |
| ADMIN visits `/dashboard`, `/application`, `/codes` | Redirected to `/admin` by `ProtectedRoute` |
| Unauthenticated visits `/admin/*` | Redirected to `/admin/login` by `AdminRoute` |
| Unauthenticated visits user routes | Redirected to `/login` by `ProtectedRoute` |
| Non-admin tries `/admin/login` | Error: "Access denied. Admin privileges required." |

---

## Backend Auth Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/register` | POST | No | Register a new user (role=USER) |
| `/api/v1/auth/login` | POST | No | Login (any role), returns JWT |
| `/api/v1/admin/login` | POST | No | Login + enforces ADMIN role |

- `POST /api/v1/admin/login` reuses the same `authService.loginUser()` from the unified auth service, then validates `role === ADMIN` before returning the JWT.

---

## One Unified Auth System

- **User table** — single Prisma model with `Role` enum (`USER | ADMIN`)
- **JWT system** — single `generateToken` / `verifyToken` utility
- **Auth middleware** — single `authenticate` / `authorize` pair
- **No duplicate logic** — admin login wraps the same `loginUser` service call
- **No separate admin table** — `role` field distinguishes user types
- **No separate token system** — same JWT secret, same expiration

---

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@example.com` | See `ADMIN_SEED_PASSWORD` in `.env` |
| User | `user@example.com` | See `USER_SEED_PASSWORD` in `.env` |

---

## Security Improvements

1. **Dedicated admin login page** — visually and functionally distinct from user login
2. **Backend role enforcement on admin login** — `POST /api/v1/admin/login` rejects non-admin users at the API level
3. **Frontend role enforcement** — `useAdminLogin` hook double-checks role before setting auth state
4. **Admin route protection** — `AdminRoute` redirects unauthenticated users to `/admin/login` (not `/login`)
5. **User route isolation** — `ProtectedRoute` redirects admins away from user pages
6. **Consistent redirects** — role-based post-login redirect eliminates ambiguity

---

## Test Scenarios

### A. User logs in normally
1. Navigate to `/login`
2. Enter user credentials
3. → Redirected to `/partner`

### B. Admin logs in from `/admin/login`
1. Navigate to `/admin/login`
2. Enter admin credentials
3. → Redirected to `/admin`

### C. User tries accessing `/admin`
1. Log in as user
2. Navigate to `/admin`
3. → Redirected to `/partner`

### D. Admin tries accessing user-only routes
1. Log in as admin
2. Navigate to `/dashboard`
3. → Redirected to `/admin`

### E. Invalid admin credentials
1. Navigate to `/admin/login`
2. Enter wrong email/password
3. → Error toast: "Invalid email or password"

### F. Non-admin uses admin login
1. Navigate to `/admin/login`
2. Enter user credentials
3. → Error toast: "Access denied. Admin privileges required."
