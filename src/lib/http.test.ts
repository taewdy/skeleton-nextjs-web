import { HttpError, getJson } from './http';

// These tests use a tiny in-memory fetch mock to validate behavior.
// They do not hit the network.

const realFetch = global.fetch;

afterEach(() => {
  global.fetch = realFetch as any;
});

it('returns typed json when ok', async () => {
  const data = { hello: 'world' };
  global.fetch = (async () => ({ ok: true, json: async () => data })) as any;
  const result = await getJson<typeof data>('https://example.com');
  expect(result.hello).toBe('world');
});

it('throws HttpError on non-ok response', async () => {
  global.fetch = (async () => ({ ok: false, status: 503, text: async () => 'nope' })) as any;
  await expect(getJson('https://example.com')).rejects.toBeInstanceOf(HttpError);
});

