"use client";

export default function GlobalError({ error }: { error: unknown }) {
  console.error(error);
  return (
    <html>
      <body>
        <div className="container">
          <h1 className="title">Something went wrong</h1>
          <p className="muted">Please try again shortly.</p>
        </div>
      </body>
    </html>
  );
}

