import Image from 'next/image';
import { Suspense } from 'react';

import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { getPhotos } from '@/lib/photos';
import type { Photo } from '@/types/photo';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

function parseIntOrUndefined(value: string | string[] | undefined): number | undefined {
  if (typeof value !== 'string') return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

async function PhotosList({ albumId, limit }: { albumId?: number; limit?: number }) {
  const photos: Photo[] = await getPhotos({ albumId, limit });
  if (!photos.length) return <p className="muted">No photos found.</p>;
  return (
    <div className="grid">
      {photos.map((p) => (
        <div key={p.id} className="card" style={{ display: 'flex', gap: 12 }}>
          <Image
            src={p.thumbnailUrl}
            alt={p.title}
            width={80}
            height={80}
            style={{ borderRadius: 8, flexShrink: 0 }}
          />
          <div>
            <h3>{p.title}</h3>
            <p className="muted">Album #{p.albumId} • Photo #{p.id}</p>
            <div style={{ height: 6 }} />
            <a href={p.url} target="_blank" rel="noreferrer">
              Open full image ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PhotosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const albumId = parseIntOrUndefined(searchParams.albumId);
  const limit = parseIntOrUndefined(searchParams.limit) ?? 20;

  return (
    <>
      <Header />
      <Container>
        <h1 className="title">Photos</h1>
        <p className="muted">
          Server-rendered photo feed from JSONPlaceholder. Use query params like
          <span className="kbd"> ?albumId=1&amp;limit=12</span>.
        </p>
        <div style={{ height: 12 }} />
        <Suspense fallback={<p className="muted">Loading photos…</p>}>
          <PhotosList albumId={albumId} limit={limit} />
        </Suspense>
      </Container>
    </>
  );
}
