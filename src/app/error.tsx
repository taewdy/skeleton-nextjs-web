"use client";

export default function GlobalError({ error }: { error: unknown }) {
  // Keep logging to surface server/client errors during development
  // while rendering a simple, layout-wrapped message for users.
  // eslint-disable-next-line no-console
  console.error(error);
  return (
    <div className="container">
      <h1 className="title">Something went wrong</h1>
      <p className="muted">Please try again shortly.</p>
    </div>
  );
}
