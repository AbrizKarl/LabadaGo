# CLAUDE.md — LabadaGo Project Memory

This file is the persistent memory for Claude Code. Read it fully before making any change. It reflects the project state as of **July 18, 2026** (updated same day after starting Part 2 mobile work).

## What this project is

**LabadaGo** is a laundry shop management system — a school project by **Karl Andrei Abriz (IT342 G01)**. It replaces pen-and-paper order tracking for small laundry shops with:

1. A staff-facing ReactJS web dashboard (order intake, status management, customer list)
2. A customer-facing web experience (place orders, track status) — same web app, different role
3. An Android Kotlin mobile app (Part 2 assignment — **auth flow built**, native Kotlin + XML Views, no Compose)

Repo: https://github.com/AbrizKarl/LabadaGo (branch `main`). Built incrementally across graded school assignments, but treat it as one real, continuously improving product.

## Tech stack

- **Backend:** Spring Boot 3.3.4, Java (user runs Java 22 locally), Maven (installed globally, NO maven wrapper — always `mvn spring-boot:run` from `Backend/`, run in a terminal, never VS Code's Run button)
- **Backend auth:** Spring Security + JWT (custom filter). `JwtAuthFilter` sets the principal to the user's **email as a plain string** — no Spring authorities. Role checks (customer vs staff) happen **manually inside Service methods** via `user.getRole().equals("STAFF")` + `ResponseStatusException` — never `@PreAuthorize`.
- **Data:** Spring Data JPA + Hibernate → Supabase managed PostgreSQL (`ap-southeast-1`)
- **Frontend:** React (Create React App), React Router, plain **CSS Modules + design tokens** — NO Tailwind, NO component libraries, NO styled-components
- **Pattern:** Controller → Service → Repository, DTOs for every request/response, never expose entities
- Frontend stores `token`, `name`, `role` in localStorage; API calls send `Authorization: Bearer <token>`
- **Mobile:** Native Kotlin, XML Views (Empty Views Activity template, no Jetpack Compose), Retrofit2 + Gson + OkHttp logging interceptor. `SessionManager` (SharedPreferences) stores `token`/`name`/`role` — the mobile equivalent of the web app's localStorage. Base URL is `ApiConfig.BASE_URL` (`http://10.0.2.2:8080/`, the emulator's alias for host localhost) — a single constant to change at deploy time.

## Critical safety rules

- `Backend/src/main/resources/application.properties` contains **real database credentials** and is **gitignored on purpose**. NEVER commit it, never include it in any zip or output. Only `application.properties.example` is committed. (Two credential leaks were caught before — do not cause a third.)
- Never build fake/placeholder functionality that LOOKS real. No fabricated data, no fake charts, no dummy numbers. Unbuilt features get a visible-but-disabled treatment. This is the single most important project principle and it also matches the assignment rules: "Placeholder-only, non-working, or unfinished features are not allowed."

## Design system rules (mandatory for ALL UI work)

Aesthetic: professional, minimal SaaS (Stripe/Linear/Notion/CleanCloud), explicitly NOT "AI-generated looking."

1. **No inline styles** — every component gets a `.module.css` file. (One sanctioned exception: the `Skeleton` component passes width/height via the style attribute because those are per-usage data, not styling.)
2. **No duplicated logic** — shared code gets extracted (`apiClient.js` is the shared fetch wrapper; `utils/format.js` has `formatPeso()` — use it for ALL price display).
3. **Only `tokens.css` variables** for colors/spacing/radius/shadows — never hardcoded values. Neutral gray scale + one indigo brand color + semantic success/warning/danger. Font: Inter.
4. **No gradients** — one deliberate exception: the Dashboard hero banner. (This is why `Skeleton` uses a pulse animation, not a gradient shimmer.)
5. **No emoji as icons** — use the hand-built SVG set in `src/components/icons/Icon.js`; check it before adding new icons.
6. **Subtle motion only** — ~120–200ms fades/slides, button `:active` scale. Respect `prefers-reduced-motion` (tokens.css already handles it globally).
7. **Empty states matter** — use the `EmptyState` component, honest copy, real actions only. Filtered-tab empty states must say "nothing matches this filter," not "no data exists."

## Recently completed (July 18, 2026 — "polish pass")

A UI polish pass was completed and verified (npm build + Playwright functional tests with mocked APIs). Changes — 3 new files, 7 modified:

- **NEW** `src/components/ui/Skeleton.js` + `.module.css` — pulse-animation loading placeholders
- **NEW** `src/utils/format.js` — `formatPeso()` with locale thousand separators (₱1,100)
- `OrdersPage` + `CustomersPage`: skeleton loading rows, horizontal-scroll table wrappers for mobile (`.tableWrap`, min-width on tables), fixed two inline-style violations (now `.alertWrap` classes), filter-aware empty states, Customers row hover
- `Dashboard`: skeleton stat values and recent-order rows, `formatPeso` for revenue, filter-aware empty copy
- `AuthLayout`: gray-50 page backdrop + soft card shadow

**Status: merged, `npm run build` verified, committed (`434014e`) and pushed to `origin/main`.** No longer pending — this is done.

## Recently completed (July 18, 2026 — mobile Part 2, auth flow)

Native Kotlin auth flow built in `mobile/` on top of the default Android Studio template. Three commits, made but **not yet pushed** (user wants to test on the Pixel 3a API 33 emulator first):

- `a8470e0` — Retrofit + Gson + OkHttp logging interceptor setup, `network/` package (`ApiConfig`, `ApiClient`, `AuthApi`, `RegisterRequest`/`LoginRequest`/`AuthResponse` mirroring the Backend DTOs field-for-field), debug-only cleartext exception scoped to `10.0.2.2` only (`src/debug/res/xml/network_security_config.xml`)
- `87d64ed` — `LoginActivity` (now the launcher, replacing the template's `MainActivity`, which was deleted) and `RegisterActivity` with client-side validation, real backend error messages (register/login always return HTTP 200 — success is `token != null`, not status code), `SessionManager` (SharedPreferences), indigo brand theme (`#3A4EB0`) + white Material cards
- `56c539a` — `DashboardActivity`: greets by name, shows role badge, working Log out. `LoginActivity` checks `SessionManager.isLoggedIn()` on launch and skips straight to Dashboard if a session exists.

**Verification note:** `compileDebugKotlin` succeeded (validates all Kotlin + every layout/manifest/string/drawable resource reference). Full `assembleDebug` could not complete in the dev shell — blocked by a missing `jlink` in a VS Code-extension-bundled JRE that Gradle's daemon picked up, unrelated to the app code. Expected to build fine in Android Studio (its own bundled JBR has `jlink`) — **not yet confirmed on the actual emulator**.

**Not yet built:** Orders/Customers/Settings screens on mobile — only the auth flow (Register → Login → Dashboard → Logout) exists so far.

## Current feature status

**Working (verified):** register/login/logout with JWT + BCrypt; Orders (customer create via modal with SERVER-side pricing from `SERVICE_PRICES` in `OrderService` — never trust client prices; customer own-order history; staff all-orders view + status dropdown PENDING → IN_PROGRESS → READY → COMPLETED); Settings (name change, password change with current-password verification — email deliberately NOT editable because JWT is keyed by email); Customers page (staff-only, backend enforces 403); Dashboard (real stats from real data, zeros when empty).

**Known debt:**
- `src/api/apiClient.js` has API base URL **hardcoded to `http://localhost:8080`** — must become `REACT_APP_API_BASE_URL` env var before any deployment
- `SecurityConfig` CORS only allows localhost:3000/5173 — needs production URLs at deploy time
- No automated tests, no email verification, no forgot-password
- Notifications bell + topbar search are disabled placeholders (intentional — don't fake them)
- Deployment: NOTHING deployed. Frontend → Vercel (instructor's choice); backend CANNOT run on Vercel — needs Render or Railway (undecided)

**Mobile (Part 2):** auth flow built (Register/Login/Dashboard/Logout, see above) but **not yet run on the emulator** — treat as unverified until confirmed. Orders/Customers/Settings screens not started.

**Not started:** mobile Orders/Customers/Settings, analytics/charts (deliberately — no real historical data yet).

## School assignment context (drives priorities)

1. **Part 1** (web setup + auth) — overdue since July 1. Code done; submission PDF still needs 8 screenshots pasted into the existing Word template + export.
2. **Part 2** (Android Kotlin app connecting to the same backend) — overdue since July 2. Auth flow (Register/Login/Dashboard/Logout) built and committed, **not yet verified on the emulator**, not pushed. Must be **native Kotlin, NOT Flutter** (confirmed: no Compose either, plain XML Views).
3. **Integration Milestone** — code requirements substantially met by the Orders/Settings/Customers work. Still needs the PDF: ≥3 documented end-to-end workflow tests (2 happy paths + 1 unauthorized-access test — a CUSTOMER hitting staff-only `GET /api/orders` already returns a real 403, use that), commit-history table, contribution statement.

Do NOT resume the old "CleanCloud competitor mega-brief" (rider GPS, 4 roles, Flutter app) — it was rejected as out of scope.

## Working style with this user

- Student, needs **explicit step-by-step instructions** — exact commands, exact paths, one step at a time, checkpoints between steps.
- Frequently mixes up terminal working directories — when in doubt, verify with `dir` before proceeding. New VS Code terminals often open one level too high.
- Port conflicts (8080/3000) from old sessions are common: `netstat -ano | findstr :PORT` → `taskkill /PID <pid> /F`.
- Verify frontend changes with `npm run build` before declaring done. Backend changes: user must run `mvn spring-boot:run` and report output.
- Windows machine; `LF will be replaced by CRLF` git warnings are cosmetic noise — ignore.
- Commit messages should honestly describe incremental progress.
