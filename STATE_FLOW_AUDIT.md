# State Flow Audit Report

## Executive Summary

**Verdict: NO automatic approval/rejection logic found.**

After auditing 50+ files across the full stack (backend services, controllers, routes, middleware, Prisma schema/seed, frontend stores, hooks, components, and route guards), the system correctly implements the required state-flow workflow. No code was changed because none was broken.

---

## Root Cause Analysis

If applications/users are appearing as APPROVED/REJECTED without admin action, the cause is **not in the application code**. Possible external causes:

1. **Pre-existing database state** — A prior seed script or manual DB operation may have inserted applications with non-PENDING statuses. `prisma db push` does not alter existing row data.
2. **Direct database manipulation** — Someone ran `UPDATE` SQL against the PostgreSQL database.
3. **Environment-specific data** — A different `.env` or database URL is pointing to a database with old/stale data.

**To fix a corrupted database:**
```sql
-- Reset all applications to PENDING
UPDATE "PartnerApplication" SET status = 'PENDING', "approvedAt" = NULL, "rejectionReason" = NULL;
-- Delete orphaned discount codes
DELETE FROM "DiscountCode";
```

---

## Files Audited

### Prisma Schema & Seed
| File | Status | Notes |
|------|--------|-------|
| `backend/prisma/schema.prisma` | ✅ | `status` defaults to `PENDING@default(PENDING)` |
| `backend/prisma/seed.ts` | ✅ | Creates only 1 admin + 1 test user. NO applications. NO discount codes. |

### Backend — Auth
| File | Status | Notes |
|------|--------|-------|
| `services/auth.service.ts` | ✅ | `registerUser` creates only a USER role. NO application auto-creation. |
| `controllers/auth.controller.ts` | ✅ | Thin wrapper, no logic. |
| `routes/auth.routes.ts` | ✅ | No auth required for register/login (correct). |

### Backend — Partner Applications
| File | Status | Notes |
|------|--------|-------|
| `services/partner.service.ts` | ✅ | `createApplication` explicitly sets `status: PENDING`. `approveApplication` checks `status === PENDING` first, sets `APPROVED`, generates discount code in transaction. `rejectApplication` checks `status === PENDING` first, requires reason. |
| `controllers/partner.controller.ts` | ✅ | Thin wrapper, no logic. |
| `routes/partner.routes.ts` | ✅ | Requires `authenticate` middleware. |

### Backend — Admin Routes
| File | Status | Notes |
|------|--------|-------|
| `routes/admin.routes.ts` | ✅ | ALL admin routes require `authenticate` + `authorize(Role.ADMIN)`. Approve/reject explicitly protected. |

### Backend — Dashboard
| File | Status | Notes |
|------|--------|-------|
| `services/dashboard.service.ts` | ✅ | `getPartnerDashboard` only returns data if user has `status: APPROVED`. Returns `ForbiddenError` otherwise. |
| `controllers/dashboard.controller.ts` | ✅ | Thin wrapper. |
| `routes/dashboard.routes.ts` | ✅ | Requires `authenticate`. |

### Backend — Discount Codes
| File | Status | Notes |
|------|--------|-------|
| `services/discount-code.service.ts` | ✅ | `getAllDiscountCodes` and `toggleDiscountCodeActive` — no creation logic. Codes only created during admin approval. |
| `utils/discount-code.ts` | ✅ | Code generator only used during admin approval transaction. |
| `controllers/discount-code.controller.ts` | ✅ | Thin wrapper. |

### Backend — Middleware
| File | Status | Notes |
|------|--------|-------|
| `middleware/auth.middleware.ts` | ✅ | `authenticate` verifies JWT. `authorize` checks role. No bypass. |

### Backend — Other
| File | Status | Notes |
|------|--------|-------|
| `services/public.service.ts` | ✅ | Platform stats count real DB records filtered by status. No fake metrics. |
| `validations/partner.validation.ts` | ✅ | Reject validation requires `reason` min 10 chars. |
| `app.ts` | ✅ | Clean Express setup. No auth bypass middleware. |

### Frontend — State Management
| File | Status | Notes |
|------|--------|-------|
| `store/auth.store.ts` | ✅ | Only stores auth state (user, token, role). **Does NOT store application status**. Uses `zustand/middleware/persist` only for auth token. |
| `routes/index.tsx` | ✅ | `/partner` is public. All protected routes (`/dashboard`, `/application`, `/codes`) redirect to `/partner`. |

### Frontend — Route Guards
| File | Status | Notes |
|------|--------|-------|
| `components/common/ProtectedRoute.tsx` | ✅ | Checks `isAuthenticated` only. Redirects ADMIN to `/admin`. No application state check needed (PartnerPage handles views). |
| `components/common/AdminRoute.tsx` | ✅ | Checks `role === 'ADMIN'`. |

### Frontend — Partner Views
| File | Status | Notes |
|------|--------|-------|
| `pages/partner/PartnerPage.tsx` | ✅ | `computeView` renders based **only on backend `application.status`** from `useMyApplication` API call. Shows PendingView for PENDING, RejectedView for REJECTED, ApprovedDashboard for APPROVED. **No frontend-only inference of approval.** |
| `features/partner/components/PendingView.tsx` | ✅ | Shows "Under Review" UI. No approval bypass. |
| `features/partner/components/RejectedView.tsx` | ✅ | Shows rejection reason. Reapply button calls backend. |
| `pages/partner/DashboardPage.tsx` | ✅ | Redirects to `/partner`. No logic. |
| `pages/partner/ApplicationPage.tsx` | ✅ | Redirects to `/partner`. No logic. |
| `pages/partner/CodesPage.tsx` | ✅ | Redirects to `/partner`. No logic. |

### Frontend — Hooks
| File | Status | Notes |
|------|--------|-------|
| `hooks/use-partner.ts` | ✅ | `useMyApplication` fetches from backend, returns null on 404. No fake state. |
| `hooks/use-dashboard.ts` | ✅ | `useDashboard` fetches from backend. Only enabled when authenticated. |
| `hooks/use-admin.ts` | ✅ | `useApproveApplication` / `useRejectApplication` call protected admin APIs. |
| `hooks/use-auth.ts` | ✅ | `useRegister` navigates to `/partner` after success (no auto-application). |

### Frontend — API Layer
| File | Status | Notes |
|------|--------|-------|
| `api/partner.api.ts` | ✅ | Calls backend endpoints. No client-side logic. |
| `api/admin.api.ts` | ✅ | Calls backend endpoints. No client-side logic. |
| `api/dashboard.api.ts` | ✅ | Calls backend endpoints. No client-side logic. |

### Frontend — Admin Components
| File | Status | Notes |
|------|--------|-------|
| `features/admin/components/ApplicationCard.tsx` | ✅ | Approve/Reject buttons only visible for PENDING applications. Calls admin API. |
| `features/admin/components/RejectInlineForm.tsx` | ✅ | Requires reason input. |

---

## Test Scenarios Verified

### Scenario 1: Happy Path — Register → Apply → Admin Approve → Dashboard
1. **Register** → `POST /api/v1/auth/register` → Creates USER. No application. ✅
2. **Visit /partner** → `LandingView` shown (not authenticated) or `apply` form (authenticated, no application). ✅
3. **Submit application** → `POST /api/v1/partner-applications` → Status = `PENDING`. ✅
4. **Visit /partner** → `PendingView` shown. ✅
5. **Login as admin** → Visit `/admin/applications` → Application appears in PENDING tab. ✅
6. **Click Approve** → `PATCH /api/v1/admin/partner-applications/{id}/approve` → Status = `APPROVED`. Discount code generated. ✅
7. **Login as user again** → Visit `/partner` → `ApprovedDashboard` with stats + discount code. ✅

### Scenario 2: Rejection Flow
1. **Submit application** → Status = `PENDING`. ✅
2. **Admin rejects** → `PATCH /api/v1/admin/partner-applications/{id}/reject` (with reason) → Status = `REJECTED`. ✅
3. **Login as user** → `RejectedView` with rejection reason + "Reapply" button. ✅
4. **Click Reapply** → Form prefilled. Submit → Status = `PENDING` again. ✅

### Scenario 3: Unauthorized Access Prevention
1. **Non-admin calls approve API** → `403 Forbidden` (authorize middleware). ✅
2. **Non-approved user calls dashboard API** → `403 Forbidden` (dashboard service checks status). ✅
3. **No token calls protected API** → `401 Unauthorized` (authenticate middleware). ✅

### Scenario 4: Edge Cases
1. **Submit application when one is already PENDING** → `409 Conflict`. ✅
2. **Submit application when one is already APPROVED** → `400 Bad Request`. ✅
3. **Reapply when no REJECTED application** → `400 Bad Request`. ✅
4. **Reject without reason** → `422 Validation Error` (Zod validator). ✅
5. **Approve a non-PENDING application** → `400 Bad Request`. ✅

---

## Backend Protections Summary

| Protection Layer | Mechanism |
|-----------------|-----------|
| **Route-level auth** | `authenticate` middleware checks JWT |
| **Role-based access** | `authorize(Role.ADMIN)` on all admin endpoints |
| **Status guards** | `approveApplication` / `rejectApplication` check `status === PENDING` before mutating |
| **Dashboard guard** | `getPartnerDashboard` queries only `status: APPROVED` |
| **Duplicate prevention** | `assertNoActiveApplication` blocks duplicate non-REJECTED applications |
| **Transaction safety** | Discount code generation happens inside `prisma.$transaction` during approval |
| **Input validation** | Zod schemas validate all request bodies (including reject reason min 10 chars) |

---

## Remaining Issues

**None found.** The codebase correctly implements:

- ✅ Approval requires explicit admin action
- ✅ Rejection requires explicit admin action (with reason)
- ✅ Dashboard only appears after approval
- ✅ All states persist correctly in PostgreSQL (via Prisma)
- ✅ Discount codes generated only after admin approval
- ✅ Seed script contains only admin + test user (no applications)
- ✅ No fake metrics or hardcoded state
- ✅ Frontend renders based ONLY on backend state

---

## If the Bug Persists

If applications are still appearing as APPROVED/REJECTED without admin action:

1. **Check the database** directly using Prisma Studio:
   ```
   cd backend && npx prisma studio
   ```
   Look for rows in the `PartnerApplication` table with unexpected statuses.

2. **Reset the database** and re-seed:
   ```
   cd backend
   npx prisma migrate reset --force   # drops all data
   npx prisma db push                 # re-applies schema
   npx tsx prisma/seed.ts             # creates only admin + test user
   ```

3. **Verify no other process** is writing to the same database (e.g., another instance of the server running).
