# Task 01 — Backend: Threads OAuth Authentication

## Description
Implement Threads OAuth flow on the backend. Exchange authorization codes for tokens, link Threads accounts to users, and issue secure application sessions (JWT + refresh token via httpOnly cookies).

## Acceptance Criteria
- `POST /auth/threads/start` returns redirect URL for OAuth
- `GET /auth/threads/callback` handles provider response; creates/links account
- Secure session cookies issued; refresh rotation implemented
- Secrets loaded from env; no secrets in code
- Unit tests covering token handling, error branches, CSRF/state handling

## Dependencies
- None (first backend task)

## Effort & Priority
- Effort: M
- Priority: P0

## Technical Specs
- Framework: NestJS (or Fastify) with DI
- State/CSRF parameter validation; PKCE if supported
- Store refresh tokens as hashes; rotate on use
- Config via typed env schema; prod/staging environments

## User Stories
- As a user, I can sign in with Threads
- As a user, I can revoke my session securely

