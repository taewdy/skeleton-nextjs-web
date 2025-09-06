import { getJson } from '@/lib/http';
import type { Photo } from '@/types/photo';

const BASE = 'https://jsonplaceholder.typicode.com';

export type GetPhotosParams = {
  albumId?: number;
  limit?: number;
};

export async function getPhotos(params: GetPhotosParams = {}): Promise<Photo[]> {
  const q = new URLSearchParams();
  if (typeof params.albumId === 'number') q.set('albumId', String(params.albumId));
  if (typeof params.limit === 'number') q.set('_limit', String(params.limit));

  const url = `${BASE}/photos${q.toString() ? `?${q.toString()}` : ''}`;
  return getJson<Photo[]>(url, {
    cache: 'no-store',
    next: { revalidate: 300, tags: ['photos'] },
  });
}

