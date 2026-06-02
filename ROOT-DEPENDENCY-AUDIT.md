# Root Dependency Audit — Partner Management Portal

> **Audit date:** 2026-06-02
> **Scope:** `backend/` (Express + Prisma) + `frontend/` (React + Vite + Tailwind v4)

---

## 1. Runtime Dependencies

### Backend (`package.json` → `dependencies`)

| Package | Version | Purpose | Verified |
|---------|---------|---------|----------|
| `express` | ^4.21.2 | HTTP server, routing, middleware | ✅ Imported in 18+ files |
| `cors` | ^2.8.5 | CORS headers middleware | ✅ Imported in `app.ts` |
| `dotenv` | ^16.4.7 | `.env` loading | ✅ Imported in `config/env.ts` |
| `@prisma/client` | ^6.5.0 | Type-safe DB client (PostgreSQL) | ✅ Imported in 10 files |
| `bcryptjs` | ^2.4.3 | Password hashing | ✅ Imported in `utils/password.ts` |
| `jsonwebtoken` | ^9.0.2 | JWT creation/verification | ✅ Imported in `utils/jwt.ts` |
| `zod` | ^3.24.2 | Request validation schemas | ✅ Imported in 4 files |
| `path` (Node built-in) | — | Path resolution for `.env` | ✅ Used in `config/env.ts` |

**Total: 7 runtime packages + 1 Node.js built-in. All accounted for.**

### Frontend (`package.json` → `dependencies`)

| Package | Version | Purpose | Verified |
|---------|---------|---------|----------|
| `react` | ^19.2.6 | UI library | ✅ Imported in 22+ files |
| `react-dom` | ^19.2.6 | DOM renderer | ✅ Imported in `main.tsx` |
| `react-router-dom` | ^7.16.0 | Client-side routing | ✅ Imported in 16 files |
| `@tanstack/react-query` | ^5.100.14 | Server state / data fetching | ✅ Imported in 5 files |
| `zustand` | ^5.0.14 | Client state management | ✅ Imported in `auth.store.ts` |
| `axios` | ^1.16.1 | HTTP client | ✅ Imported in 2 files |
| `sonner` | ^2.0.7 | Toast notifications | ✅ Imported in 5 files |
| `react-hook-form` | ^7.77.0 | Form state management | ✅ Imported in `ApplicationFormView.tsx` |
| `@hookform/resolvers` | ^5.4.0 | Zod → react-hook-form bridge | ✅ Imported in `ApplicationFormView.tsx` |
| `zod` | ^4.4.3 | Form field validation | ✅ Imported in partner schema file |

**Total: 10 runtime packages. All accounted for.**

---

## 2. Dev Dependencies

### Backend (`package.json` → `devDependencies`)

| Package | Version | Purpose | Verified |
|---------|---------|---------|----------|
| `typescript` | ^5.7.3 | Type checking + `tsc` build | ✅ Used in `build` script |
| `tsx` | ^4.19.2 | TypeScript exec (`dev`, `db:seed`) | ✅ Used in 2 scripts |
| `prisma` | ^6.5.0 | Schema CLI (`generate`, `push`, `migrate`, `studio`) | ✅ Used in 4 scripts |
| `@types/express` | ^5.0.0 | Express type defs | ✅ Ambient — no explicit import |
| `@types/cors` | ^2.8.17 | CORS type defs | ✅ Ambient — no explicit import |
| `@types/bcryptjs` | ^2.4.6 | bcryptjs type defs | ✅ Ambient — no explicit import |
| `@types/jsonwebtoken` | ^9.0.9 | jsonwebtoken type defs | ✅ Ambient — no explicit import |
| `@types/node` | ^22.13.0 | Node.js type defs | ✅ Ambient — no explicit import |

### Frontend (`package.json` → `devDependencies`)

| Package | Version | Purpose | Verified |
|---------|---------|---------|----------|
| `vite` | ^8.0.12 | Build tool + dev server | ✅ Imported in `vite.config.ts` + used in 3 scripts |
| `@vitejs/plugin-react` | ^6.0.1 | Vite React plugin | ✅ Imported in `vite.config.ts` |
| `@tailwindcss/vite` | ^4.3.0 | Tailwind v4 Vite plugin | ✅ Imported in `vite.config.ts` |
| `tailwindcss` | ^4.3.0 | CSS framework | ✅ Referenced in `styles/index.css` via `@import` |
| `typescript` | ~6.0.2 | Type checking | ✅ Used in `build` script (`tsc -b`) |
| `@types/react` | ^19.2.14 | React type defs | ✅ Ambient — resolved by `@types/` |
| `@types/react-dom` | ^19.2.3 | ReactDOM type defs | ✅ Ambient — resolved by `@types/` |
| `@types/node` | ^24.12.3 | Node.js type defs for Vite config | ✅ Referenced in `tsconfig.node.json` |
| `eslint` | ^10.3.0 | Linter runner + config helpers | ✅ Used in `lint` script + imported in eslint.config.js |
| `@eslint/js` | ^10.0.1 | ESLint recommended flat config | ✅ Imported in `eslint.config.js` |
| `eslint-plugin-react-hooks` | ^7.1.1 | React Hooks lint rules | ✅ Imported in `eslint.config.js` |
| `eslint-plugin-react-refresh` | ^0.5.2 | Fast Refresh lint rules | ✅ Imported in `eslint.config.js` |
| `typescript-eslint` | ^8.59.2 | TypeScript ESLint integration | ✅ Imported in `eslint.config.js` |
| `globals` | ^17.6.0 | ESLint globals definitions | ✅ Imported in `eslint.config.js` |
| `lightningcss` | ^1.29.2 | CSS processor (Tailwind v4 default) | ✅ Used implicitly by Vite/Tailwind pipeline |
| `lightningcss-win32-x64-msvc` | ^1.32.0 | Platform binary for LightningCSS | ⚠️ Redundant — auto-installed by `lightningcss` |

---

## 3. Unused Dependency Candidates

### Backend — NONE

All 7 runtime dependencies and all 8 dev dependencies are actively required.

### Frontend — 1 Candidate

| Package | Reason | Verdict |
|---------|--------|---------|
| `lightningcss-win32-x64-msvc` ^1.32.0 | Platform-specific binary explicitly listed. The parent `lightningcss` package auto-detects platform and installs this automatically. Explicit declaration is redundant but harmless. | **Can remove** (optional, keeps lock deterministic) |

**Note:** The explicit `lightningcss-win32-x64-msvc` entry is not harmful — it pins the Windows binary version, which can prevent unexpected updates. This is a stylistic/process choice, not a bug.

---

## 4. Missing Dependency Checks

### Backend

- **`path` (Node.js built-in):** Used in `config/env.ts`. No npm package needed.
- **`fs` or other Node built-ins:** Not used anywhere. ✅
- All `import` statements resolve to packages in `package.json`. ✅

### Frontend

- **`path` (Node.js built-in):** Used in `vite.config.ts`. Always available in Node.js context. No npm package needed.
- All `import` statements resolve to packages in `package.json`. ✅

### Cross-Check: No orphan imports

Every `import ... from "package-name"` across the entire codebase maps to an entry in the respective `package.json` dependencies or a Node.js built-in.

---

## 5. Recommended Dependency Cleanup

### Critical: Fix `@types/express` version mismatch

| Issue | Details |
|-------|---------|
| **Problem** | `@types/express` is `^5.0.0` but `express` is `^4.21.2` |
| **Risk** | `@types/express@5` types are written for Express v5 API, which has breaking changes from Express v4. This can cause false type errors or silently incorrect types. |
| **Fix** | Pin `@types/express` to `^4.17.21` (the latest v4-compatible type definitions) |

### Optional cleanup

| Package | Suggestion |
|---------|-----------|
| `lightningcss-win32-x64-msvc` | Remove from `devDependencies` — `lightningcss` manages platform binaries automatically. If you want deterministic binary versions, keep it. |
| `dotenv` | Consider replacing with Node 20+ built-in `--env-file` flag if you control the runtime. Low priority. |

### Duplicate tooling check

- ✅ No duplicate CSS tooling (Tailwind v4 + LightningCSS is the standard stack)
- ✅ Only one form library (react-hook-form)
- ✅ Only one state management library (zustand for client, react-query for server)
- ✅ Only one HTTP client (axios)
- ✅ Only one routing library (react-router-dom)
- ✅ Only one validation library (zod)
- ✅ Only one database ORM (Prisma)

---

## 6. Security & Stability Notes

### Version stability

| Package | Version | Concern | Severity |
|---------|---------|---------|----------|
| `zod` (frontend) | ^4.4.3 | **Zod v4 is in early pre-release/beta.** It is not yet stable and may have breaking changes in minor releases. The backend uses stable Zod v3. | ⚠️ **Medium** |
| `typescript` (frontend) | ~6.0.2 | TypeScript 6.0 is very new (shipped ~2026). May have undiscovered edge cases with tooling plugins. | ⚠️ **Low** |
| `vite` (frontend) | ^8.0.12 | Vite 8 is the latest major. Verify all plugins are compatible. | ✅ Verified |
| `@tanstack/react-query` | ^5.100.14 | Latest v5 stable. No concerns. | ✅ |
| `eslint` | ^10.3.0 | ESLint 10 with flat config. All plugins use flat config format. | ✅ |
| `@types/express` | ^5.0.0 | **MISMATCH** with Express v4 | ❌ **High** |
| `react-router-dom` | ^7.16.0 | Latest v7. No concerns. | ✅ |
| `zustand` | ^5.0.14 | Latest v5. No concerns. | ✅ |

### Security advisories

- `jsonwebtoken` ^9.0.2 — Latest stable. Past vulnerabilities (v8.x) are resolved.
- `bcryptjs` ^2.4.3 — Pure JS, no native deps. No known advisories.
- `axios` ^1.16.1 — Latest. SSRF/Prototype pollution issues in ancient versions are resolved.
- `zod` v3 backend — Stable and well-audited.
- `zod` v4 frontend — Pre-release, less battle-tested.

### Prisma-specific notes

- ✅ `@prisma/client` ^6.5.0 + `prisma` ^6.5.0 — Paired versions (same major/minor). No mismatch risk.
- ✅ Prisma generator is `prisma-client-js` (default, no additional packages needed)
- ✅ Database is PostgreSQL — no extra driver packages needed (Prisma bundles it)

### React Query-specific notes

- ✅ `@tanstack/react-query` ^5.100.14 — Used consistently across all data-fetching hooks
- ✅ DevTools package NOT included — good, not needed in production

### Zustand persistence notes

- ✅ `zustand/middleware` (built-in `persist` middleware) — imported and used in `auth.store.ts`
- ✅ No extra persistence packages needed (uses `localStorage` by default)

### Tailwind v4-specific notes

- ✅ `@tailwindcss/vite` ^4.3.0 — The official Tailwind v4 Vite plugin. No PostCSS config needed.
- ✅ `tailwindcss` ^4.3.0 — Peer dependency for the plugin
- ✅ `lightningcss` ^1.29.2 — Tailwind v4 uses Lightning CSS internally; Vite detects it automatically
- ✅ No PostCSS, no `tailwind.config.js`, no `@tailwind` directives — all correct for v4

### Vite plugin compatibility

| Plugin | Compatible with Vite 8? | Version |
|--------|------------------------|---------|
| `@vitejs/plugin-react` ^6.0.1 | ✅ Yes | Latest |
| `@tailwindcss/vite` ^4.3.0 | ✅ Yes | Latest |

### TypeScript typings verification

| @types package | For package | Compatible? |
|----------------|-------------|-------------|
| `@types/express` ^5.0.0 | `express` ^4.21.2 | ❌ Mismatch — should be `^4.17.x` |
| `@types/cors` ^2.8.17 | `cors` ^2.8.5 | ✅ |
| `@types/bcryptjs` ^2.4.6 | `bcryptjs` ^2.4.3 | ✅ |
| `@types/jsonwebtoken` ^9.0.9 | `jsonwebtoken` ^9.0.2 | ✅ |
| `@types/node` ^22.13.0 (backend) | Node.js 22 | ✅ |
| `@types/node` ^24.12.3 (frontend) | Node.js 24 | ✅ |
| `@types/react` ^19.2.14 | `react` ^19.2.6 | ✅ |
| `@types/react-dom` ^19.2.3 | `react-dom` ^19.2.6 | ✅ |

---

## 7. Suggested Exact Install Commands

### Backend — Clean install

```bash
cd backend
npm install \
  express@4.21.2 \
  cors@2.8.5 \
  dotenv@16.4.7 \
  @prisma/client@6.5.0 \
  bcryptjs@2.4.3 \
  jsonwebtoken@9.0.2 \
  zod@3.24.2

npm install --save-dev \
  typescript@5.7.3 \
  tsx@4.19.2 \
  prisma@6.5.0 \
  @types/express@4.17.21 \   # <-- FIXED from ^5.0.0
  @types/cors@2.8.17 \
  @types/bcryptjs@2.4.6 \
  @types/jsonwebtoken@9.0.9 \
  @types/node@22.13.0
```

### Frontend — Clean install

```bash
cd frontend
npm install \
  react@19.2.6 \
  react-dom@19.2.6 \
  react-router-dom@7.16.0 \
  @tanstack/react-query@5.100.14 \
  zustand@5.0.14 \
  axios@1.16.1 \
  sonner@2.0.7 \
  react-hook-form@7.77.0 \
  @hookform/resolvers@5.4.0 \
  zod@4.4.3

npm install --save-dev \
  vite@8.0.12 \
  @vitejs/plugin-react@6.0.1 \
  @tailwindcss/vite@4.3.0 \
  tailwindcss@4.3.0 \
  typescript@6.0.2 \
  @types/react@19.2.14 \
  @types/react-dom@19.2.3 \
  @types/node@24.12.3 \
  eslint@10.3.0 \
  @eslint/js@10.0.1 \
  eslint-plugin-react-hooks@7.1.1 \
  eslint-plugin-react-refresh@0.5.2 \
  typescript-eslint@8.59.2 \
  globals@17.6.0 \
  lightningcss@1.29.2
```

### Remove optional platform binary (if desired)

```bash
cd frontend
npm uninstall lightningcss-win32-x64-msvc
```

---

## Summary

| Metric | Backend | Frontend |
|--------|---------|----------|
| Runtime packages | 7 | 10 |
| Dev packages | 8 | 16 |
| Unused packages | 0 | 0 (1 optional redundancy) |
| Missing packages | 0 | 0 |
| Version mismatches | 1 (⚠️ `@types/express`) | 0 |
| Stable versions | 6 of 7 | 9 of 10 (⚠️ zod v4 pre-release) |
| Total audit score | **🟡 1 issue** | **🟢 Clean** |

### Action items

1. **HIGH PRIORITY:** Fix `@types/express` from `^5.0.0` to `^4.17.21` in `backend/package.json`
2. **LOW PRIORITY:** Consider pinning `zod` on frontend to exact version (`4.4.3` instead of `^4.4.3`) due to pre-release instability
3. **OPTIONAL:** Remove `lightningcss-win32-x64-msvc` from frontend devDependencies
