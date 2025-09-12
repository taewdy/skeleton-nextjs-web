# Architecture Design

## Overview
Build a modern dating web application that leverages Threads as a social graph and analyzes inter-user interactions to compute relationship affinity and drive matching. The system is a decoupled web application with a Next.js frontend and a separate backend service responsible for authentication, data ingestion, analysis, scoring, and matching.

## System Architecture
- Client: Next.js 14 (App Router) on Vercel
  - UI, routing, SSR/ISR for public pages
  - Auth handoff and session management via backend-issued JWT cookies
  - Calls backend REST APIs via `fetch`/`axios`-equivalent wrapper

- Backend (separate repo/service): Python (FastAPI) 
  - Framework: FastAPI (modern, fast (high-performance), web framework for building APIs with Python 3.11+ based on standard Python type hints)
  - Responsibilities: Threads OAuth, user identities, data ingestion, content analysis, scoring, matching, messaging, admin APIs
  - Exposes REST APIs (OpenAPI-first)
  - Authentication: OAuth with Threads → backend issues signed JWT (short-lived) + refresh token (httpOnly cookie)

- Data Layer
  - Primary DB: PostgreSQL Supabase (hosted)
    - Entities: users, profiles, thread_accounts, posts, interactions, analysis_results, scores, matches, messages, audit_logs
  - Caching/Queues: We won't use Cache or Queues for the MVP, but Redis is a good option for future scalability
  - Object Storage: Use Supabase Storage // confirm if this is feasible for storing any media/assets

- AI/Analysis Layer
  - Provider-agnostic interface for LLM and embeddings (OpenAI-compatible API)
  - Services: toxicity filtering, sentiment analysis, interest extraction, personality inference (MBTI/Big5/Enneagram — optional/tunable)
  - Weighting/decay pipeline producing interaction_score per user→user edge

- Observability & Ops
  - Logging: structured JSON logs with request correlation IDs
  - Metrics: Just have export capability for now, we won't set up Prometheus/OpenTelemetry; dashboards (Grafana) for MVP

## Technology Choices and Rationale
- Next.js + TypeScript: DX, SSR/ISR, bundling, routing; widely adopted
- Python + FastAPI: rapid development, async support, strong ML/AI ecosystem
- PostgreSQL: relational integrity, mature, supports extensions like `pgvector` if needed later
- Redis: don't use for MVP, but good for caching, rate limiting, queues
- OpenAI-compatible API: pluggable analysis provider
- JSON Schema/OpenAPI: contract-first API design and testability

## UX Flow (High-Level)
1. Visitor lands on marketing page → starts sign-in with Threads
2. Backend OAuth completes → account linked → session established
3. Ask user if we want to sync then Ingestion kicks off (user posts, replies, interactions)
4. Analysis jobs compute sentiment/toxicity/interests → scores per interaction edge
5. Matching service builds recommendations; user sees candidate profiles
6. Mutual positive interest → match → messaging unlocked
7. Users manage preferences/privacy; can unlink Threads

## Security Considerations
- OAuth dance handled only on backend; rotate client secrets
- Store refresh tokens hashed; JWT short TTL; CSRF protection via same-site cookies
- RBAC (user, admin); route guards on admin APIs
- PII minimization; purge policies; GDPR/right-to-erasure workflows
- Input validation (runtime validation via Zod/class-validator); output schemas
- Rate limiting + IP/device fingerprinting for abuse
- Content moderation: toxicity filter before persistence/visibility

## Performance & Scalability
- Read patterns: profile and recommendations cached; incremental updates on events
- Pagination and keyset queries; composite indexes for interactions
- Horizontal scaling of stateless API + workers

## Development Standards
- SOLID, KISS, DRY; composition over inheritance
- Monorepo optional; keep frontend (this repo) separate from backend service repo
- Linting/formatting: ESLint + Prettier; strict TS configs
- Testing: unit-first; contract tests for APIs; smoke tests for workers
- Git: trunk-based or GitFlow; conventional commits; PR checks with tests/lint

## API Design (Backend)
Base URL: `/api/v1`

- Auth
  - `POST /auth/threads/start` → redirect URL
  - `GET /auth/threads/callback` → exchanges code, sets session
  - `POST /auth/refresh` → rotate tokens
  - `POST /auth/logout` → invalidate refresh token

- User/Profile
  - `GET /me` → current user profile + status
  - `PATCH /me` → update profile fields and preferences

- Ingestion
  - `POST /ingest/bootstrap` → start initial import (idempotent)
  - `GET /ingest/status` → job states

- Analysis/Scoring
  - `GET /scores/:userId` → outbound/inbound interaction scores
  - `POST /scores/recompute` → force recompute for user(s)

- Matching
  - `GET /matches/recommendations` → recommended profiles
  - `POST /matches/like` → express interest
  - `GET /matches` → mutual matches

- Messaging
  - `GET /messages/:matchId` → list messages
  - `POST /messages/:matchId` → send message

- Admin
  - `GET /admin/health` `GET /admin/metrics`
  - `POST /admin/users/:id/ban` etc.

All endpoints documented in OpenAPI; schemas versioned; breaking changes via new routes or versions.

## Database Schema (Relational Outline)
- `users(id, email, created_at, status)`
- `thread_accounts(id, user_id FK, external_id, handle, access_token_encrypted, refresh_token_hash, expires_at)`
- `profiles(id, user_id FK, display_name, bio, age, location, preferences_json)`
- `posts(id, thread_account_id FK, external_id, content, created_at, metadata_json)`
- `interactions(id, src_account_id FK, dst_account_id FK, post_id FK, type, created_at)`
- `analysis_results(id, interaction_id FK, sentiment_score, toxicity_score, interests_json, model_meta_json)`
- `scores(id, src_user_id FK, dst_user_id FK, score, decay_applied_at, weight_meta_json)`
- `matches(id, user_a_id FK, user_b_id FK, created_at, status)`
- `likes(id, liker_user_id FK, likee_user_id FK, created_at)`
- `messages(id, match_id FK, sender_user_id FK, content, created_at)`
- `audit_logs(id, actor_user_id FK, action, target_type, target_id, meta_json, created_at)`
Indexes on foreign keys, time, and frequently queried combinations.

## Scoring Model (Initial)
- Inputs: sentiment on replies/mentions, frequency, recency (exponential decay), toxicity penalty, interest overlap
- Score(user A → user B) = Σ(weight_i × metric_i) × decay(t)
- Mutual positive threshold → eligible for match recommendation
Tunable via feature flags; store `weight_meta_json` for explainability.

## Project Structure (Frontend in this repo)
```
src/
  app/                 # Next.js App Router pages/layouts
  features/
    auth/              # Auth UI, session hooks, guards
    profiles/          # Profile view/edit components
    matching/          # Recommendations & match list UIs
    messaging/         # Conversations UI
    threads/           # Connect Threads, status, import triggers
    scoring/           # Score visualization (debug/admin)
  shared/
    http/              # API client wrapper (fetch)
    ui/                # Reusable UI components
    config/            # Typed env/config
```

Adhere to SRP and localize feature concerns; prefer hooks and small, pure components; limit third-party deps.

## Testing Strategy (Frontend)
- Unit tests with Jest + React Testing Library
- Mock HTTP via MSW/hand-rolled mocks for unit scope
- Aim for 70%+ coverage on feature logic; avoid E2E here

## Risks and Mitigations
- API rate limits from Threads → backoff, retry queues, caching
- Model drift/bias → regular evaluation, guardrails, human review on flags
- Privacy concerns → explicit consent screens, data export/delete tools
- Cold start recommendations → content-based interest matching until interactions accrue

## Deliverables
- This document
- Task breakdown files under `docs/`
- Progress tracker `docs/progress-tracker.md`
- UI design `docs/ui-design.md`
- Minimal code scaffolding for planned features

