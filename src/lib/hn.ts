import { getJson } from '@/lib/http';

type StoryId = number;

export type HnItem = {
  id: StoryId;
  title: string;
  url?: string;
  by: string;
  score: number;
  descendants?: number;
};

const BASE = 'https://hacker-news.firebaseio.com/v0';

export async function getTopStoryIds(): Promise<StoryId[]> {
  return getJson<StoryId[]>(`${BASE}/topstories.json`, {
    // Allow soft caching when used with ISR
    cache: 'no-store',
    next: { revalidate: 300, tags: ['hn-top'] },
  });
}

export async function getItem(id: StoryId): Promise<HnItem> {
  return getJson<HnItem>(`${BASE}/item/${id}.json`, {
    cache: 'no-store',
    next: { revalidate: 300, tags: [`hn-item-${id}`] },
  });
}

export async function getTopStories(limit = 10): Promise<HnItem[]> {
  const ids = (await getTopStoryIds()).slice(0, Math.max(0, limit));
  const items = await Promise.all(ids.map((id) => getItem(id)));
  return items.filter(Boolean);
}

