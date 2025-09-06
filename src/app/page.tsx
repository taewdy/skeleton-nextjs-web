import Link from 'next/link';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <Container>
        <h1 className="title">Welcome to the Next.js Skeleton</h1>
        <p className="muted">
          This project demonstrates a clean, SSR‑first Next.js setup with TypeScript, a simple
          component structure, and sensible defaults.
        </p>

        <div style={{ height: 16 }} />

        <div className="grid">
          <div className="card">
            <h3>News (SSR)</h3>
            <p>
              Explore a server-rendered feed powered by the Hacker News API with caching and robust
              error handling.
            </p>
            <div style={{ height: 8 }} />
            <Link href="/news" aria-label="Hacker News (SSR)">
              → View Top Stories
            </Link>
          </div>

          <div className="card">
            <h3>Developer Experience</h3>
            <p>
              Preconfigured ESLint, Prettier, strict TypeScript, and a light test setup to keep code
              scalable and maintainable.
            </p>
          </div>

          <div className="card">
            <h3>Structure</h3>
            <p>
              Organized into <span className="kbd">app</span>, <span className="kbd">components</span>,{' '}
              <span className="kbd">lib</span>, and <span className="kbd">types</span> with SOLID‑minded
              utilities.
            </p>
          </div>

          <div className="card">
            <h3>Photos (SSR)</h3>
            <p>
              Browse photos from JSONPlaceholder. Filter by album using query params like
              <span className="kbd"> ?albumId=1</span>.
            </p>
            <div style={{ height: 8 }} />
            <Link href="/photos" aria-label="JSONPlaceholder Photos (SSR)">
              → View Photos
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
