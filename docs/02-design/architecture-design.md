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

Note: We align table and column names with the Threads API fields provided in `docs/reference/threads_postman_collection.json`. To keep intent explicit, we name content tables with a `threads_` prefix.

- `users(
    id uuid PK,
    email text UNIQUE NULL,
    status text NOT NULL DEFAULT 'active', -- enum: active|banned|deleted
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`

- `thread_accounts(
    id uuid PK,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    threads_user_id text NOT NULL UNIQUE,      -- Threads "id"
    username text NOT NULL,                   -- Threads "username"
    name text NULL,                           -- Threads "name"
    profile_picture_url text NULL,            -- Threads "threads_profile_picture_url"
    biography text NULL,                      -- Threads "threads_biography"
    is_verified boolean NOT NULL DEFAULT false,
    access_token_encrypted text NOT NULL,     -- app user access token, encrypted
    refresh_token_hash text NULL,             -- if applicable
    token_expires_at timestamptz NULL,
    permissions_json jsonb NULL,              -- provider scopes/config
    last_synced_at timestamptz NULL,
    status text NOT NULL DEFAULT 'active',    -- enum: active|revoked
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`

- `profiles(
    id uuid PK,
    user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    display_name text NULL,
    bio text NULL,
    age int NULL,
    location text NULL,
    preferences_json jsonb NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`

- `threads_posts(
    id uuid PK,
    thread_account_id uuid NOT NULL REFERENCES thread_accounts(id) ON DELETE CASCADE,
    threads_media_id text NOT NULL UNIQUE,    -- Threads media "id"
    media_product_type text NULL,             -- e.g., 'THREADS'
    media_type text NULL,                     -- e.g., 'TEXT', 'IMAGE', 'VIDEO'
    text text NULL,                           -- post caption/body
    media_url text NULL,                      -- media_url
    thumbnail_url text NULL,                  -- thumbnail_url
    permalink text NULL,                      -- permalink
    username text NULL,                       -- denormalized for convenience
    timestamp timestamptz NULL,               -- provider timestamp
    shortcode text NULL,                      -- shortcode
    has_replies boolean NULL,
    is_reply boolean NULL,
    is_reply_owned_by_me boolean NULL,
    is_quote_post boolean NULL,
    alt_text text NULL,
    link_attachment_url text NULL,
    reply_audience text NULL,
    topic_tag text NULL,
    hide_status text NULL,                    -- e.g., hidden/visible
    root_media_id text NULL,                  -- Threads root_post.id
    replied_to_media_id text NULL,            -- Threads replied_to.id
    quoted_post_media_id text NULL,           -- quoted_post.id
    reposted_post_media_id text NULL,         -- reposted_post.id
    gif_url text NULL,
    poll_attachment_json jsonb NULL,          -- poll_attachment
    children_media_ids text[] NULL,           -- children ids (if carousel/thread chain)
    raw_json jsonb NULL,                      -- full provider payload for audit/debug
    ingested_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`

- `interactions(
    id uuid PK,
    src_account_id uuid NOT NULL REFERENCES thread_accounts(id) ON DELETE CASCADE,
    dst_account_id uuid NULL REFERENCES thread_accounts(id) ON DELETE SET NULL,
    post_id uuid NULL REFERENCES threads_posts(id) ON DELETE SET NULL,
    type text NOT NULL,                       -- mention|reply|repost|quote|like (if available)
    created_at timestamptz NOT NULL,
    recorded_at timestamptz NOT NULL DEFAULT now()
  )`

- `analysis_results(
    id uuid PK,
    interaction_id uuid NOT NULL REFERENCES interactions(id) ON DELETE CASCADE,
    sentiment_score numeric NULL,
    toxicity_score numeric NULL,
    interests_json jsonb NULL,
    model_meta_json jsonb NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`

- `scores(
    id uuid PK,
    src_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dst_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score numeric NOT NULL,
    decay_applied_at timestamptz NULL,
    weight_meta_json jsonb NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (src_user_id, dst_user_id)
  )`

- `matches(
    id uuid PK,
    user_a_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_b_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'active',    -- active|closed
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (LEAST(user_a_id, user_b_id), GREATEST(user_a_id, user_b_id))
  )`

- `likes(
    id uuid PK,
    liker_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    likee_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now()
  )`

- `messages(
    id uuid PK,
    match_id uuid NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    sender_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`

- `audit_logs(
    id uuid PK,
    actor_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
    action text NOT NULL,
    target_type text NOT NULL,
    target_id text NULL,
    meta_json jsonb NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`

Indexes on foreign keys, provider IDs (`threads_user_id`, `threads_media_id`), and time-based queries. Consider GIN indexes for JSONB fields used in filters.

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
