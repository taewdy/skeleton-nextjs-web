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
  - so that we know which medeia_id needs to