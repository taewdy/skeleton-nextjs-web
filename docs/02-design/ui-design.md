# UI Design

## Design System
- Colors: Neutral base (zinc/stone), primary accent (indigo), success (emerald), warning (amber), danger (rose)
- Typography: Inter for UI text; 14–16px base; 1.5 line-height
- Grid & Spacing: 4px scale; container max-widths at 640/768/1024/1280/1536
- Components: Buttons, Inputs, TextArea, Select, Card, Modal/Sheet, Tabs, Toasts
- Icons: Lucide/Feather-like outline icons
- Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536

## User Experience
- Onboarding: quick sign-in with Threads, clear consent for data use
- Home: recommendations first; minimal friction to like/skip
- Profile: concise editable fields; preview; privacy toggles
- Messaging: simple, focused conversation layout with readable bubbles
- Error Handling: inline validation, non-blocking toasts, retry affordances

## Interface Design
- Pages
  - `/` Landing: product value, CTA to sign in
  - `/profile` Edit/view profile
  - `/recommendations` Scrollable cards or list of candidates
  - `/matches` List of mutual matches
  - `/messages/:matchId` Conversation view
- States: loading skeletons, empty states, error boundaries
- Navigation: top header with session; mobile bottom nav for key sections

## Accessibility & Usability
- Keyboard focus ring and tab order defined
- ARIA labels on interactive components
- Color contrast AA+ validated
- Touch targets ≥ 44px; spacing avoids accidental taps

## Implementation Guidelines
- Use Tailwind for layout/spacing/typography; avoid custom CSS where possible
- Prefer composable primitives in `shared/ui/`
- Keep feature UIs self-contained in `src/features/*`

## Task-Specific Design Notes
- Task 07 (Auth): Sign-in CTA, connection status, and sign-out in header
- Task 08 (Profiles/Matching): Profile form sections; recommendation card with photo, bio, interests, like button
- Task 09 (Messaging): Conversation list + input area; error/retry on send failure

