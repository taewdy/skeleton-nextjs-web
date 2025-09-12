# Task 07 — Frontend: Auth & Session UI

## Description
Implement sign-in with Threads entry points, connect status, and session handling (calling backend). Provide guard components and hooks.

## Acceptance Criteria
- Sign-in button triggers backend `/auth/threads/start` then redirects
- Callback handled by backend; frontend reads session via `/me`
- Session-aware header/nav; sign-out button calls `/auth/logout`
- Unit tests for hooks and components (mock HTTP)

## Dependencies
- Task 01–02 on backend

## Effort & Priority
- Effort: M
- Priority: P0

## Technical Specs
- Add `src/features/auth` with hooks (`useSession`), components, and route guards
- Use existing `shared/http` client; no new deps

## User Stories
- As a user, I can sign in/out and see my status

