# API Documentation

This document specifies the backend API for the dating application that leverages Threads as a social graph. It is provider‑agnostic and follows REST conventions with JSON payloads.

## Conventions
- Base URL: `https://api.example.com/api/v1` (configurable per environment)
- Content‑Type: `application/json; charset=utf-8`
- Authentication: session cookies (httpOnly JWT + refresh) for browsers; `Authorization: Bearer <token>` supported for non‑browser clients
- Errors: JSON `{ "error": { "code": string, "message": string, "details"?: any } }`
- Timestamps: ISO 8601 in UTC
- Pagination: keyset via `cursor` and `limit` (default 20, max 100)
- Idempotency: provide `Idempotency-Key` header for POST endpoints where appropriate

## Security
- Cookies: `SameSite=Lax`, `Secure` in production, httpOnly for session tokens
- CSRF: state‑changing endpoints verify `Origin`/`Referer`; for cross‑site deployments, enable a double‑submit token via `X-CSRF-Token`
- Rate limiting: standard headers `X-RateLimit-*` and `Retry-After`

## Schemas (abridged)
- User: `{ id: string, email?: string, createdAt: string, status: 'active' | 'banned' }`
- Profile: `{ id: string, userId: string, displayName: string, bio?: string, age?: number, location?: string, preferences?: Record<string, unknown> }`
- ThreadsLink: `{ linked: boolean, handle?: string, linkedAt?: string }`
- IngestStatus: `{ state: 'idle' | 'running' | 'failed' | 'completed', progress?: number, updatedAt: string }`
- Score: `{ srcUserId: string, dstUserId: string, score: number, updatedAt: string }`
- Recommendation: `{ userId: string, profile: Profile, score: number }`
- Match: `{ id: string, user: { id: string, profile: Profile }, createdAt: string }`
- Message: `{ id: string, matchId: string, senderUserId: string, content: string, createdAt: string }`

## Authentication

POST /auth/threads/start
- Description: Initiates Threads OAuth; returns provider redirect URL
- Auth: public
- Request: none
- Response: `{ redirectUrl: string, state: string }`

GET /auth/threads/callback
- Description: OAuth callback; on success, establishes session and links account
- Auth: public
- Query: `code`, `state`
- Response (XHR): `{ ok: true }`
- Browser: may 302 redirect to app (e.g., `/profile`)
- Notes: Server exchanges the short-lived token for a long-lived token and persists it. No client action is required.

POST /auth/refresh
- Description: Rotates access token using refresh token cookie
- Auth: refresh cookie
- Request: none
- Response: `{ ok: true }`

POST /auth/logout
- Description: Invalidates refresh token and clears cookies
- Auth: required
- Request: none
- Response: `204 No Content`

Background refresh (internal)
- Description: The backend schedules refresh of long-lived provider tokens before expiry. No public endpoint is required; an admin-only endpoint may be added for manual retries if needed.

GET /auth/csrf (optional)
- Description: Issues CSRF token for double‑submit strategy
- Auth: required
- Response: `{ csrfToken: string }`

## User & Profile

GET /me
- Description: Returns current user’s profile and linkage status
- Auth: required
- Response:
```
{
  user: User,
  profile: Profile,
  threads: ThreadsLink,
  ingest: IngestStatus
}
```

PATCH /me
- Description: Update profile fields
- Auth: required
- Request:
```
{
  displayName?: string,
  bio?: string,
  age?: number,
  location?: string,
  preferences?: Record<string, unknown>
}
```
- Response: `Profile`

## Ingestion

POST /ingest/bootstrap
- Description: Starts initial Threads import (idempotent)
- Auth: required
- Request: none
- Response: `{ jobId: string }`

GET /ingest/status
- Description: Returns ingestion job status
- Auth: required
- Response: `IngestStatus`

## Analysis & Scoring

GET /scores/:userId
- Description: Returns inbound and outbound scores for a user
- Auth: admin or same user
- Response:
```
{ inbound: Score[], outbound: Score[] }
```

POST /scores/recompute
- Description: Forces recompute for the authenticated user (or specified user with admin role)
- Auth: required (admin for arbitrary user)
- Request: `{ userId?: string }`
- Response: `{ ok: true }`

## Matching

GET /matches/recommendations?cursor&limit
- Description: Returns ranked recommendations for the current user
- Auth: required
- Response:
```
{ items: Recommendation[], nextCursor?: string }
```

POST /matches/like
- Description: Express interest in another user; mutual likes create a match
- Auth: required
- Request: `{ userId: string }`
- Response:
```
{ status: 'liked' | 'matched', matchId?: string }
```

GET /matches
- Description: Lists mutual matches for the current user
- Auth: required
- Response: `{ items: Match[] }`

## Messaging

GET /messages/:matchId?cursor&limit
- Description: List messages for a match
- Auth: required (must be a participant)
- Response: `{ items: Message[], nextCursor?: string }`

POST /messages/:matchId
- Description: Send a message to a match
- Auth: required (must be a participant)
- Request: `{ content: string }`
- Response: `Message`

## Admin

GET /admin/health
- Description: Health check
- Auth: none (can be public)
- Response: `{ ok: true }`

GET /admin/metrics
- Description: Prometheus metrics
- Auth: restricted (IP or auth)
- Response: `text/plain`

POST /admin/users/:id/ban
- Description: Ban a user
- Auth: admin
- Request: `{ reason?: string }`
- Response: `{ ok: true }`

## Errors
- 400: validation error — `{ error: { code: 'BAD_REQUEST', message, details } }`
- 401: not authenticated — `{ error: { code: 'UNAUTHENTICATED', message } }`
- 403: not authorized — `{ error: { code: 'FORBIDDEN', message } }`
- 404: not found — `{ error: { code: 'NOT_FOUND', message } }`
- 409: conflict — `{ error: { code: 'CONFLICT', message } }`
- 429: rate limited — headers include `Retry-After`
- 5xx: server errors

## Notes
- OpenAPI spec generation recommended from code; this file describes the contract for planning. Keep in sync with the generated spec.
- See Threads OAuth reference collection: `docs/reference/threads_postman_collection.json`
