# Submission Readiness — Haett

## Final Pre-Submission Sanity Checklist

- [ ] `backend/.env` has valid `DATABASE_URL` (PostgreSQL running)
- [ ] `backend/.env` has unique `JWT_SECRET`
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Prisma migration applied (`npx prisma migrate dev --name init`)
- [ ] Seed data created (`npx prisma db seed`)
- [ ] Backend starts without errors (`npm run dev` in `backend/`)
- [ ] Frontend starts without errors (`npm run dev` in `frontend/`)
- [ ] Login works with admin@example.com / Admin@123456
- [ ] Login works with user@example.com / User@123456
- [ ] TypeScript compiles (`npx tsc --noEmit` in both projects)
- [ ] No hardcoded secrets in code
- [ ] `.env.example` exists with placeholder values (no real secrets)
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.env` is in `.gitignore`

## Recommended Screenshots to Capture

| # | Screen | What to Show |
|---|--------|-------------|
| 1 | Landing Page | Hero section, benefits grid, how-it-works |
| 2 | Register Form | Full registration form with validation |
| 3 | Application Form | Partner application form filled out |
| 4 | Pending Status | Status card with pending badge and info |
| 5 | Rejected State | Rejection reason + reapply CTA |
| 6 | Dashboard | Stats grid (codes, uses, discount) |
| 7 | Discount Codes | Code list with active/inactive badges + copy |
| 8 | Admin Panel | Tab filters with application cards |
| 9 | Admin Approve | Approved card showing discount code + toggle |
| 10 | Admin Reject | Inline rejection form |
| 11 | Empty State | "No applications" with helpful message |
| 12 | Error State | Error fallback with retry button |
| 13 | Mobile View | Hamburger menu, responsive layout |
| 14 | 404 Page | Branded not-found page |

## Best Demo Flow

1. **Start as visitor** — Show landing page (`/partner`)
2. **Register** — Click "Apply Now", fill registration
3. **Submit application** — Fill partner form, submit
4. **See pending** — Show pending review state
5. **Login as admin** — Logout → login as `admin@example.com`
6. **Review and approve** — See pending tab, approve
7. **Login as user** — Logout → login as `user@example.com`
8. **See dashboard** — Show stats, discount codes, copy code
9. **Show mobile** — Resize browser to mobile width, show sidebar toggle

## GitHub Repository Polish

- [ ] Repository description is set
- [ ] README.md is the entry point (not a subdirectory README)
- [ ] License file (MIT recommended for portfolios)
- [ ] `.gitignore` covers `node_modules/`, `.env`, `dist/`, `.prisma/`
- [ ] No large files or unnecessary binaries committed
- [ ] Commit history is clean (consider squashing WIP commits)
- [ ] Add topics: `react`, `typescript`, `express`, `prisma`, `tailwindcss`
- [ ] Enable GitHub Pages or add deployment instructions

## Final Checks

- [ ] All toasts appear and disappear correctly (4s duration)
- [ ] All buttons have hover/focus/active states
- [ ] All forms have proper validation feedback
- [ ] All links and navigation work
- [ ] All API calls handle loading/error/success states
- [ ] Application compiles with `npm run build` (both frontend and backend)
- [ ] README instructions are complete and accurate
- [ ] Screenshots are optimized (< 500KB each, PNG or WebP)
