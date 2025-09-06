import { HttpError, getJson } from './http';

// These tests use a tiny in-memory fetch mock to validate behavior.
// They do not hit the network.

const realFetch: typeof fetch = global.fetch;

afterEach(() => {
  global.fetch = realFetch;
});

it('returns typed json when ok', async () => {
  const data = { hello: 'world' };
  const mockOk: typeof fetch = async () =>
    ({ ok: true, json: async () => data } as unknown as Response);
  global.fetch = mockOk;

  const result = await getJson<typeof data>('https://example.com');
  expect(result.hello).toBe('world');
});

it('throws HttpError on non-ok response', async () => {
  const mockErr: typeof fetch = async () =>
    ({ ok: false, status: 503, text: async () => 'nope' } as unknown as Response);
  global.fetch = mockErr;

  await expect(getJson('https://example.com')).rejects.toBeInstanceOf(HttpError);
});

it('throws HttpError with status 0 on network error', async () => {
  const mockNetworkFail: typeof fetch = (async () => {
    throw new Error('network down');
  }) as any;
  global.fetch = mockNetworkFail;

  await expect(getJson('https://example.com')).rejects.toMatchObject({ status: 0 });
});
