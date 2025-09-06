type Env = {
  SITE_URL: string;
};

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const DEFAULT_DEV_SITE_URL = 'http://localhost:3000';

function assertAbsoluteHttpUrl(name: keyof Env, value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error(`Invalid protocol for ${name}: ${url.protocol}`);
    }
    return url.toString().replace(/\/$/, ''); // normalize no trailing slash
  } catch (e) {
    throw new Error(`Invalid URL for ${name}: ${value}`);
  }
}

function loadEnv(): Env {
  let siteUrlRaw = process.env.SITE_URL?.trim();

  if (!siteUrlRaw) {
    if (NODE_ENV === 'production') {
      throw new Error('Missing required environment variable: SITE_URL');
    }
    // Provide a sensible default during local development and tests
    siteUrlRaw = DEFAULT_DEV_SITE_URL;
    if (NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.warn(`SITE_URL not set; defaulting to ${DEFAULT_DEV_SITE_URL} for ${NODE_ENV}.`);
    }
  }

  const SITE_URL = assertAbsoluteHttpUrl('SITE_URL', siteUrlRaw);
  return { SITE_URL };
}

let cached: Env | null = null;

export const env: Env = (() => {
  if (cached) return cached;
  cached = loadEnv();
  return cached;
})();
