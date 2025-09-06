import Link from 'next/link';
import { Suspense } from 'react';

import { Container, Header } from '@shared/ui';
import { getTopStories } from '@features/news';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // soft cache for 5 minutes (ISR when deployed)

async function StoriesList() {
  const stories = await getTopStories(10);
  return (
    <ol>
      {stories.map((s) => (
        <li key={s.id} style={{ margin: '12px 0' }}>
          <a href={s.url ?? `https://news.ycombinator.com/item?id=${s.id}`} target="_blank" rel="noreferrer">
            {s.title}
          </a>
          <div className="muted" style={{ fontSize: 12 }}>
            {s.score} points by {s.by} • {s.descendants ?? 0} comments
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function NewsPage() {
  return (
    <>
      <Header />
      <Container>
        <h1 className="title">Hacker News • Top Stories</h1>
        <p className="muted">Server‑rendered at request time with caching and robust fetch.</p>
        <div style={{ height: 12 }} />
        <Suspense fallback={<p className="muted">Loading stories…</p>}>
          <StoriesList />
        </Suspense>

        <div style={{ height: 16 }} />
        <Link href="/">← Back home</Link>
      </Container>
    </>
  );
}
