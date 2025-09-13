# System Diagrams

The following diagrams visualize key flows and the overall architecture based on the design in `docs/02-design/architecture-design.md`.

## Architecture Overview

```mermaid
flowchart LR
  subgraph Client
    U[User Browser]
  end

  subgraph Frontend[Next.js - Vercel]
    FE[Web App]
  end

  subgraph Backend[FastAPI Service]
    API[REST API]
    WQ[(Job Queue<br/>optional Redis)]
    WK[Workers]
  end

  DB[(PostgreSQL)]
  OBJ[(Object Storage<br/>optional)]
  AI[AI Provider<br/>OpenAI-compatible]
  THR[Threads API]

  U --> FE
  FE -- HTTPS --> API
  API <--> DB
  API <-- publish/enqueue --> WQ
  WQ --> WK
  WK <--> DB
  API --> THR
  WK --> THR
  WK --> AI
  FE --> OBJ
  WK --> OBJ

  classDef ext fill:#fff5,stroke:#888,stroke-width:1px;
  class THR,AI,OBJ ext;
```

Notes:
- Frontend communicates only with the backend API (and optionally object storage for assets).
- Backend API handles OAuth, sessions, and exposes endpoints for ingestion, scoring, and matching.
- Workers perform ingestion and analysis off the request path; a lightweight queue (Redis) is optional for MVP.

## User Authentication - Threads OAuth

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Next.js Frontend
  participant API as FastAPI Backend
  participant THR as Threads OAuth
  participant DB as PostgreSQL

  U->>FE: Click "Sign in with Threads"
  FE->>API: POST /auth/threads/start
  API-->>FE: { redirectUrl, state }
  FE->>U: Redirect to Threads 302
  U->>THR: Authorize App
  THR-->>API: GET /auth/threads/callback?code&state
  API->>API: Exchange code to tokens
  API->>API: Verify state
  API->>DB: Upsert user + thread_account
  API-->>U: Set session cookies
  API-->>U: Redirect to app
  U->>FE: Load app
  FE->>API: GET /me
  API-->>FE: { user, profile, threads, ingest }
```

Key points:
- Short-lived access token with refresh cookie; httpOnly, SameSite, Secure.
- `GET /me` confirms linkage and ingestion status post-login.

## Data Ingestion from Threads

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant API as FastAPI API
  participant WQ as Queue optional
  participant WK as Workers
  participant THR as Threads API
  participant DB as PostgreSQL

  U->>FE: Start import
  FE->>API: POST /ingest/bootstrap
  alt Queue enabled
    API->>WQ: enqueue bootstrap{userId}
  else Direct
    API->>WK: trigger bootstrap(userId)
  end
  par
    WK->>THR: Get User Profile - id username name picture bio
    WK->>THR: List User Posts threads
    WK->>THR: List User Replies
    WK->>THR: List Mentions of User
  end
  THR-->>WK: batched responses
  WK->>DB: Upsert thread_accounts (profile fields)
  WK->>DB: Upsert threads_posts (media + relationships)
  WK->>DB: Insert interactions - reply mention repost quote
  WK-->>API: Update job status
  API-->>FE: { jobId }
  FE->>API: GET /ingest/status - poll
  API-->>FE: { state, progress }
```

Notes:
- Use provider IDs (`threads_user_id`, `threads_media_id`) for idempotency.
- Persist `raw_json` for audit and recovery.

## Content Analysis and Scoring

```mermaid
sequenceDiagram
  participant WK as Workers
  participant DB as PostgreSQL
  participant AI as AI Provider

  loop For new/updated interactions
    WK->>DB: Fetch interactions needing analysis
    WK->>AI: Analyze(text, context)
    AI-->>WK: { sentiment, toxicity, interests, meta }
    WK->>DB: Insert analysis_results
    WK->>DB: Update scores A to B with decay and weights
  end
```

Notes:
- Apply exponential decay by recency; weight interaction types.
- Toxicity threshold gates persistence/visibility.

## User Matching

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant API as FastAPI API
  participant DB as PostgreSQL

  U->>FE: Open Recommendations
  FE->>API: GET /matches/recommendations?cursor
  API->>DB: Query scores, apply thresholds/diversity
  DB-->>API: Ranked candidates
  API-->>FE: { items, nextCursor }
  U->>FE: Like user
  FE->>API: POST /matches/like { userId }
  API->>DB: Insert like
  API->>DB: Check mutual like -> create match
  API-->>FE: { status: 'liked' | 'matched', matchId? }
```

Notes:
- Keyset pagination for performance; avoid duplicates and recent skips.
- Mutual likes create `matches`; unlock messaging.

## References
- Architecture: `docs/02-design/architecture-design.md`
- API: `docs/02-design/API_DOCS.md`
- Deployment: `docs/02-design/DEPLOYMENT.md`
