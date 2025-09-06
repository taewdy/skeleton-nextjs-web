import { Container } from '@shared/ui';
import { FeatureCard } from '@/components/FeatureCard';
import { Header } from '@shared/ui';

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
          <FeatureCard
            title="News (SSR)"
            link={{
              kind: 'internal',
              href: '/news',
              label: 'View Top Stories',
              ariaLabel: 'Hacker News (SSR)',
            }}
          >
            Explore a server-rendered feed powered by the Hacker News API with caching and robust
            error handling.
          </FeatureCard>

          <FeatureCard title="Developer Experience">
            Preconfigured ESLint, Prettier, strict TypeScript, and a light test setup to keep code
            scalable and maintainable.
          </FeatureCard>

          <FeatureCard title="Structure">
            Organized into <span className="kbd">app</span>, <span className="kbd">components</span>,{' '}
            <span className="kbd">lib</span>, and <span className="kbd">types</span> with SOLID‑minded
            utilities.
          </FeatureCard>

          <FeatureCard
            title="Photos (SSR)"
            link={{
              kind: 'internal',
              href: '/photos',
              label: 'View Photos',
              ariaLabel: 'JSONPlaceholder Photos (SSR)',
            }}
          >
            Browse photos from JSONPlaceholder. Filter by album using query params like
            <span className="kbd"> ?albumId=1</span>.
          </FeatureCard>
        </div>
      </Container>
    </>
  );
}
