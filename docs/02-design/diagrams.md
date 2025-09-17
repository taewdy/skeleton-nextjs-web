# System Diagrams

The following diagrams visualize key flows and the overall architecture based on the design in `docs/02-design/architecture-design.md`.

## ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    users {
        uuid id PK
        text email
        text status
        text display_name
        text bio
        int age
        text location
        jsonb preferences_json
        timestamptz created_at
        timestamptz updated_at
    }
    thread_accounts {
        uuid id PK
        uuid user_id FK
        text threads_user_id
        text username
        text name
        text profile_picture_url
        text biography
        boolean is_verified
        text access_token_encrypted
        text access_token_type
        text refresh_token_hash
        timestamptz token_issued_at
        timestamptz last_refreshed_at
        timestamptz token_expires_at
        timestamptz permission_expires_at
        jsonb permissions_json
        timestamptz last_synced_at
        text status
        timestamptz created_at
        timestamptz updated_at
    }
    syncs {
        uuid id PK
        uuid thread_account_id FK
        text status
        timestamptz started_at
        timestamptz completed_at
        jsonb meta_json
    }
    threads_content {
        serial id PK
        uuid sync_id FK
        VARCHAR_255 media_id
        VARCHAR_50 media_product_type
        VARCHAR_255 from_user_id
        VARCHAR_255 from_username
        VARCHAR_255 to_user_id
        VARCHAR_255 to_username
        text text
        VARCHAR_50 hide_status
        VARCHAR_20 type
        VARCHAR_255 root_post_id
        VARCHAR_255 replied_to_id
        boolean is_reply_owned_by_me
        VARCHAR_20 sentiment
        integer affection_level
        jsonb emotional_tone
        NUMERIC_3_2 toxicity
        NUMERIC_3_2 flirtatiousness
        timestamptz sentiment_analyzed_at
        VARCHAR_20 sentiment_version
        boolean is_positive
        jsonb metadata
        timestamptz created_at_threads
        timestamptz created_at
        timestamptz updated_at
        DOUBLE_PRECISION engagement_score
        text permalink
        VARCHAR_255 shortcode
    }
    threads_content_analysis {
        uuid id PK
        uuid content_id FK
        text provider
        text version
        NUMERIC_3_2 sentiment_score
        NUMERIC_3_2 toxicity_score
        jsonb interests_json
        jsonb model_meta_json
        timestamptz analyzed_at
    }
    threads_content_analysis_monthly {
        uuid id PK
        uuid content_id FK
        int year
        int month
        NUMERIC_3_2 sentiment_avg
        NUMERIC_3_2 toxicity_avg
        int sample_count
        timestamptz recomputed_at
    }
    scores {
        uuid id PK
        uuid src_user_id FK
        uuid dst_user_id FK
        numeric score
        timestamptz decay_applied_at
        jsonb weight_meta_json
        timestamptz updated_at
    }
    matches {
        uuid id PK
        uuid user_a_id FK
        uuid user_b_id FK
        text status
        timestamptz created_at
    }
    likes {
        uuid id PK
        uuid liker_user_id FK
        uuid likee_user_id FK
        timestamptz created_at
    }
    messages {
        uuid id PK
        uuid match_id FK
        uuid sender_user_id FK
        text content
        timestamptz created_at
    }
    audit_logs {
        uuid id PK
        uuid actor_user_id FK
        text action
        text target_type
        text target_id
        jsonb meta_json
        timestamptz created_at
    }
    profile_photos {
        uuid id PK
        uuid user_id FK
        text bucket
        text object_path
        boolean is_primary
        int sort_order
        timestamptz created_at
    }

    users ||--o{ thread_accounts : "has"
    users ||--o{ scores : "scores"
    users ||--o{ matches : "matches"
    users ||--o{ likes : "likes"
    users ||--o{ messages : "sends"
    users ||--o{ profile_photos : "has"
    users ||--o{ audit_logs : "performs"

    thread_accounts ||--o{ syncs : "has"
    
    syncs ||--o{ threads_content : "includes"

    threads_content ||--|| threads_content_analysis : "has analysis"
    threads_content ||--o{ threads_content_analysis_monthly : "monthly rollups"

    scores ||--o{ users : "scored by"
    matches ||--o{ users : "matched with"
    likes ||--o{ users : "liked by"
```

Type legend for ERD (diagram-safe tokens → PostgreSQL types):
- `UUID` → `uuid`
- `TEXT` → `text`
- `JSONB` → `jsonb`
- `BOOLEAN` → `boolean`
- `INTEGER` → `integer`
- `TIMESTAMPTZ` → `timestamptz`
- `DOUBLE_PRECISION` → `double precision`
- `VARCHAR_20` → `varchar(20)`
- `VARCHAR_50` → `varchar(50)`
- `VARCHAR_255` → `varchar(255)`
- `NUMERIC_3_2` → `numeric(3, 2)`

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
- On callback, server exchanges short-lived token to long-lived token and persists lifecycle metadata.

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
