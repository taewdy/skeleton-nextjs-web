## Next.js + TypeScript Skeleton (SSR-first)

This repository is a minimal, production-minded Next.js skeleton focused on SSR, clean architecture, and maintainability.

### Highlights

- SSR-first with App Router and strict TypeScript
- Clean structure (`app`, `components`, `lib`, `types`) and SOLID-focused utilities
- Sensible defaults: ESLint (core-web-vitals), Prettier, Jest (via next/jest)
- SSR News page: Hacker News Top Stories with caching and error handling
- SSR Photos page: JSONPlaceholder photos with album filtering

### Project Structure

- `src/app`: App Router routes, `layout.tsx`, global error, styles
- `src/components`: Reusable, presentational components
- `src/lib`: Domain-agnostic utilities (HTTP, data clients)
- `public`: Static assets

### Getting Started

1. Install dependencies:
   - `npm install` (Node 18.17+, npm 9+)
2. Run in development:
   - `npm run dev` → http://localhost:3000
3. Lint and format:
   - `npm run lint` and use your editor’s Prettier on save
4. Type check:
   - `npm run typecheck`
5. Tests:
   - `npm test`

### Environment

- Copy `.env.example` to `.env.local` and set values for your environment.
- Required variables:
  - `SITE_URL`: absolute base URL for the site, used by Next metadata (`metadataBase`). Example: `https://myapp.com`
- The env loader in `src/lib/env.ts` validates and normalizes values on startup.
  - In the hybrid layout, import from `src/shared/config` via `@shared/config`.

### SSR News Page

Visit `/news` to see a server-rendered list of Hacker News Top Stories. The page fetches at request time (`dynamic = 'force-dynamic'`) and applies a 5-minute soft revalidate window for production ISR.

### SSR Photos Page

Visit `/photos` to view photos from JSONPlaceholder. You can filter using query params:

- `albumId`: number (e.g., `/photos?albumId=1`)
- `limit`: number (e.g., `/photos?albumId=1&limit=12`)

Types and client live in `src/types/photo.ts` and `src/lib/photos.ts`.

### Design and Practices

- Separation of concerns: UI components vs. domain utilities
- Explicit data boundaries and typed helpers (`lib/http.ts`)
- No global mutable state; functions are pure and composable
- Accessibility-minded markup and semantic structure

### Customize

- Add UI library or styling system (e.g., Tailwind, CSS Modules) as desired
- Extend `src/lib` for API clients and domain logic
- Add `Route Handlers` under `app/api` if needed later (kept out here per “frontend-only” scope)

### Engineering Guidelines

These guidelines codify best practices for scalability, maintainability, and team velocity.

#### Architecture & SOLID

- Single-responsibility: Keep modules focused; avoid multi-purpose files.
- Dependency direction: `components` depend on `lib` via narrow function contracts, never the reverse.
- Open/closed: Extend behavior by composition and new modules, not by editing shared internals.
- Liskov & interfaces: Use structural typing and small, explicit types. Prefer function parameters over global state.
- DI-by-parameters: Pass collaborators (functions/config) as arguments to improve testability.

#### Folders & Naming

- `app/`: Route segments and server components. Keep pages thin; push logic into `lib/`.
- `components/`: Presentational or small container components. Co-locate tests with components.
- `lib/`: Pure utilities and API clients. No React imports here.
- `types/`: Shared domain types. Keep stable and version cautiously.
- Naming: Prefer named exports; avoid default unless conventions demand it.

#### TypeScript

- Strict mode on: Avoid `any`. Use `unknown` + narrowing for external inputs.
- Type-only imports: Enforced via ESLint; prefer `import type`.
- Narrow return types: Export functions that return precise types; avoid `Record<string, unknown>`.
- Avoid ambient mutations: Prefer pure functions and immutable data.

#### React & Next.js

- Server-first: Use Server Components by default. Add `"use client"` only when interactivity is required.
- Data fetching: Centralize HTTP in `lib/http.ts` via `getJson<T>`. Pass `cache`/`next.revalidate` intentionally.
- Error boundaries: `app/error.tsx` renders within layout (no `<html>` wrapper). For full-document fallbacks, use `global-error.tsx`.
- Routing: Use `next/link` for internal nav. Typed routes are encouraged at call sites; reusable components may accept `string` for flexibility.
- Images: Configure `images.remotePatterns` in `next.config.mjs` for remote sources.
- Metadata: `metadataBase` derives from `SITE_URL` via `src/lib/env.ts`.

#### Testing

- Unit tests for `lib/` using small, deterministic mocks (e.g., fetch stubs).
- Component tests via React Testing Library: Assert behavior and accessibility, not implementation details.
- Cover error paths: Ensure network failures and non-2xx responses throw `HttpError` with expected `status`.
- Colocation: Place `*.test.ts[x]` next to code for quick discovery.

#### Error Handling & Observability

- Normalize fetch failures: `getJson` catches network/abort and throws `HttpError(message, 0)`.
- Avoid leaking raw errors to users; log server-side, show friendly messages in UI.
- Prefer explicit return contracts over `try/catch` at call sites; handle known error shapes.

#### Performance

- Caching: Use `next: { revalidate }` for ISR and `cache` hints for SSR correctness.
- Streaming: Wrap server-rendered lists in `<Suspense>` where beneficial.
- Client bundles: Keep client components minimal; avoid passing large serialized data through props.
- Memoization: Use `useMemo`/`useCallback` only for measurable wins; default to simple code.

#### Accessibility

- Semantic HTML first. Correct heading order. Label interactive controls with `aria-*` where necessary.
- Keyboard support: Ensure focus states and tab order are usable.
- Color contrast: Respect light/dark schemes and `prefers-reduced-motion` when adding animations.

#### Security

- Input validation: Treat query params and external API data as untrusted; validate and narrow types.
- Secrets: Never commit secrets. Provide `.env.example` and read on the server only.
- Links: Use `rel="noreferrer"` for external links opened with `target="_blank"`. Prefer the shared `AppLink` component.

#### CI/CD & Hygiene

- Pre-merge gates: run `lint`, `typecheck`, and `test`.
- Commits: Use clear messages (Conventional Commits suggested). Keep diffs cohesive and scoped.
- Code review: Favor small PRs with clear acceptance criteria and tests.

#### When to add API Routes

- Add `app/api/*` route handlers when the UI needs a stable backend contract, data aggregation, or security boundaries. Keep handlers thin and reuse `lib/` utilities.

### Project Organization Options

Choose the approach that best fits your team and growth plans. Consistency matters more than specific folder names.

#### Feature‑First (recommended for scaling)

- Organize by domain (e.g., `news`, `photos`). Each feature owns its API client, types, components, and tests.
- Pages stay thin and import from features.
- Example:
  - `src/features/news/{api,components,types,index.ts}`
  - `src/features/photos/{api,components,types,index.ts}`
- Benefits: Clear ownership, SOLID by default (SRP, dependency direction), easier refactors.

In this repo (mapping/examples):
- Photos feature candidates: `src/lib/photos.ts`, `src/types/photo.ts`, and UI rendering in `src/app/photos/page.tsx`
- News feature candidates: `src/lib/hn.ts` and UI rendering in `src/app/news/page.tsx`
- How it would look: move those into `src/features/photos/{api,types}` and `src/features/news/{api}`; export via `src/features/*/index.ts`

#### Layered (good for small apps)

- Organize by type (e.g., `components`, `lib`, `types`).
- Simple to start; can tangle as features multiply.
- Use when scope is small or short‑lived.

In this repo (current examples):
- Components: `src/components/{Container.tsx,Header.tsx,FeatureCard.tsx,AppLink.tsx}`
- Libraries/clients: `src/lib/{http.ts,hn.ts,photos.ts}`
- Types: `src/types/photo.ts`
- Routes: `src/app/{page.tsx,news/page.tsx,photos/page.tsx}`

#### Hybrid (common in practice)

- Feature‑first for product code plus a small shared layer for cross‑cutting utilities and UI.
- Shared examples:
  - `src/shared/http/*` for fetch helpers
  - `src/shared/ui/*` for reusable components (e.g., `AppLink`)
  - `src/shared/config/*` for env loaders and config

In this repo (hybrid in practice):
- Shared UI: `src/shared/ui/{AppLink.tsx,Container.tsx,Header.tsx}` used across pages
- Shared HTTP: `src/shared/http/http.ts` consumed by features
- Shared config: `src/shared/config/env.server.ts` used by `src/app/layout.tsx`
- Features (flat): `src/features/news/api.ts`, `src/features/photos/{api.ts,types.ts}`

#### Naming Conventions

- Domain folders: `features`, `modules`, or `domains` — pick one.
- Shared layer: `shared`, `common`, or `core` — subdivide into `ui`, `http`, `config`, etc.
- Route groups: Use App Router groups like `app/(public)`, `(admin)`, `(marketing)` to segment layouts/UX.

#### Flat vs Nested Features

- Start flat inside each feature for simplicity: keep `api.ts`, `types.ts`, and `index.ts` at the feature root.
- Add subfolders only when complexity demands it:
  - `components/` when a feature accumulates multiple view components
  - `services/` or `api/` when you have multiple clients/endpoints
  - `utils/` for meaningful intra‑feature reuse
- Keep a barrel (`index.ts`) at the feature root so consumers don’t depend on internal file paths.
- In this repo: features are flat — see `src/features/news/client.ts` and `src/features/photos/{client.ts,types.ts}`.

#### Path Aliases (tsconfig.json)

- Add aliases for clarity and to enforce direction:
  - `@features/*` → `src/features/*`
  - `@shared/*` → `src/shared/*`
  - Keep `@/*` → `src/*` during migrations

#### Guardrails & Tips

- Keep pages thin: orchestrate data/rendering and delegate to features.
- Public surface: Each feature exposes a small `index.ts`; avoid importing its internals.
- Direction: Features can import from `@shared/*`, not from other features.
- Tests: Colocate `*.test.ts[x]` with the code they cover.
- Env: Server‑only env loader lives in shared/config; client‑safe vars use `NEXT_PUBLIC_*`.
- Document your choice here and stick to it for consistency.

#### Barrels (Public APIs)

- Each feature exposes a small, intentional surface via an `index.ts` barrel.
- Shared layers can also provide barrels for common imports.
- In this repo:
  - Features: `src/features/news/index.ts`, `src/features/photos/index.ts`
  - Shared: `src/shared/ui/index.ts`, `src/shared/http/index.ts`
  - Usage examples: `import { getTopStories } from '@features/news'`, `import { Container, Header } from '@shared/ui'`

### CI

- GitHub Actions workflow runs `lint`, `typecheck`, and `test` on pushes/PRs.
- See `.github/workflows/ci.yml`. It sets `SITE_URL` during CI to keep checks stable.

### Real-World Examples

Feature‑first / Hybrid reference repos (web services):
- Bulletproof React (feature-first reference): https://github.com/alan2207/bulletproof-react
  - Look for: domain folders, shared layer, testing conventions.
- Vercel Commerce (large Next.js app): https://github.com/vercel/commerce
  - Look for: domain-oriented modules, shared utilities, incremental feature structure.
- Cal.com (large, modular Next.js monorepo): https://github.com/calcom/cal.com
  - Look for: feature modules, shared UI packages, env/config conventions.
- Dub.co (Next.js monorepo SaaS): https://github.com/dubinc/dub
  - Look for: app router usage, modular packages, product-driven domains.
- Medusa Next.js Starter (storefront): https://github.com/medusajs/nextjs-starter-medusa
  - Look for: feature folders for commerce flows and shared components.
- Saleor React Storefront (Next.js): https://github.com/saleor/react-storefront
  - Look for: domain separation (cart, checkout, catalog) and shared utils.

Key Next.js docs
- Route Groups: https://nextjs.org/docs/app/building-your-application/routing/route-groups
- Parallel Routes / Layouts: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
- Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
- Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Environment Variables: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
