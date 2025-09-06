## Next.js + TypeScript Skeleton (SSR-first)

This repository is a minimal, production-minded Next.js skeleton focused on SSR, clean architecture, and maintainability.

### Highlights

- SSR-first with App Router and strict TypeScript
- Clean structure (`app`, `components`, `lib`, `types`) and SOLID-focused utilities
- Sensible defaults: ESLint (core-web-vitals), Prettier, Jest (ts-jest)
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
