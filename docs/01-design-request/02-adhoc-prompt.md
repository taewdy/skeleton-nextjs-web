## Update db schema

- refer to docs/reference/threads_postman_collection.json for Threads API details and update 
  - users
  - thread_accounts
  - posts
 under ## Database Schema (Relational Outline) in docs/02-design/architecture-design.md
 - we might have different table name and fields to match the data structure from Threads API

Note: Now I need to confirm schema by checking the actual data from Threads API response.

## Need more diagrams
1. We now have design about oauth flow, but we need more diagrams to illustrate the data flow and component interaction in the system. based on the docs/02-design draw sequence diagrams for the following flows:
   - User authentication
   - Data ingestion from Threads API
   - Content analysis and scoring
   - User matching
2. We also need to create an architecture diagram that shows the overall system components and their interactions.
   - refer to docs/02-design/architecture-design.md and improve the diagram 

Output: docs/02-design/diagrams.md

## We need to track sync 
- we might need sync table to track the last sync time for each user/thread_account
  - so that we can fetch only new posts since the last sync
  - we might need to add sync id to the related content tables (posts, replies, etc.) to track which sync they belong to

- I've added all the api documentation in the docs/reference/threads folder.
  - Study the api and update the db schema in docs/02-design/architecture-design.md
  - Once updated, we can draw the ERD diagram in docs/02-design/diagrams.md

## ERD
- Do we have to accept email id for user account? If so, don't we have some privacy compliance we have to follow etc? Is this envitable? Can we get away with thread id as their id? or should we use thread id as default, and let user enter their email later on? If so, we can leave email id for now, but don't receive it in our process for now?
- Confirm from thread reference if there are thread user id, user name and name as separate value
- User table should have username, possibly thread user id(or user name)
- We want to use long live token, thus we might want add a field under thread_accounts table
- Not sure why we would have user and profile table separate, they are most likely 1 to 1?
- We will have to analyse user interaction sentiment each post
- Consider below schema for thread post, I think it could be ok to include from user, to user here although the post won't have to user information, only replies but still
  
  ```
  create table public.threads_content
(
    id                    serial
        primary key,
    sync_job_id           uuid                                               not null,
    media_id              varchar(255)                                       not null
        unique,
    media_product_type    varchar(50)                                        not null,
    from_user_id          varchar(255),
    from_username         varchar(255)                                       not null,
    to_user_id            varchar(255),
    to_username           varchar(255),
    text                  text,
    hide_status           varchar(50)              default 'NOT_HUSHED'::character varying,
    type                  varchar(20)                                        not null
        constraint threads_content_type_check
            check ((type)::text = ANY ((ARRAY ['post'::character varying, 'reply'::character varying])::text[])),
    root_post_id          varchar(255),
    replied_to_id         varchar(255),
    is_reply_owned_by_me  boolean                  default false,
    sentiment             varchar(20)
        constraint threads_content_sentiment_check
            check ((sentiment)::text = ANY
                   ((ARRAY ['positive'::character varying, 'neutral'::character varying, 'negative'::character varying])::text[])),
    affection_level       integer
        constraint threads_content_affection_level_check
            check ((affection_level >= 0) AND (affection_level <= 100)),
    emotional_tone        jsonb                    default '{"joy": 0, "humor": 0, "support": 0, "affection": 0, "excitement": 0}'::jsonb,
    toxicity              numeric(3, 2)
        constraint threads_content_toxicity_check
            check ((toxicity >= (0)::numeric) AND (toxicity <= (1)::numeric)),
    flirtatiousness       numeric(3, 2)
        constraint threads_content_flirtatiousness_check
            check ((flirtatiousness >= (0)::numeric) AND (flirtatiousness <= (1)::numeric)),
    sentiment_analyzed_at timestamp with time zone,
    sentiment_version     varchar(20)              default 'gpt-4-turbo'::character varying,
    is_positive           boolean generated always as ((((sentiment)::text = 'positive'::text) AND (toxicity < 0.3))) stored,
    metadata              jsonb                    default '{}'::jsonb,
    created_at_threads    timestamp with time zone                           not null,
    created_at            timestamp with time zone default CURRENT_TIMESTAMP not null,
    updated_at            timestamp with time zone default CURRENT_TIMESTAMP not null,
    engagement_score      double precision
        constraint threads_content_engagement_score_check
            check ((engagement_score >= (0)::double precision) AND (engagement_score <= (1)::double precision)),
    permalink             text,
    shortcode             varchar(255)
);

  ```

- combine user and profile together but separate thread_accounts table which is from threads api
- things like (3, 2) can't be parsed by mermaid viewer, we should be using format like NUMERIC_3_2, that includes all the parenthesis

## we want to test data and api
in order to start implement, I want to test the data and api first

thus, I'd like to just call api to start
1. sync
2. analyze all the posts using AI

but to sync we need, token, which only can be otainbed from oauth process, right? we can't automate that only from backend, right?