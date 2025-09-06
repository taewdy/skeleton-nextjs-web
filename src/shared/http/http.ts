export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

type FetchOptions = Omit<RequestInit, 'body' | 'method'> & {
  next?: RequestInit['next'];
  cache?: RequestInit['cache'];
};

export async function getJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      // Request-time SSR by default; caller can override for ISR/SSG
      cache: options.cache ?? 'no-store',
      next: options.next,
      headers: {
        accept: 'application/json',
        ...options.headers,
      },
    });
  } catch (err) {
    // Normalize network/abort errors into HttpError for consistent handling
    const message = err instanceof Error ? err.message : 'Network error';
    throw new HttpError(message, 0);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new HttpError(text || `Request failed: ${res.status}`, res.status);
  }

  // Narrow-only parse to T; caller supplies the type contract
  return (await res.json()) as T;
}
