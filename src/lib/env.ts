type Env = {
  SITE_URL: string;
};

function requireString(name: keyof Env, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

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
  const SITE_URL = assertAbsoluteHttpUrl(
    'SITE_URL',
    requireString('SITE_URL', process.env.SITE_URL)
  );
  return { SITE_URL };
}

let cached: Env | null = null;

export const env: Env = (() => {
  if (cached) return cached;
  cached = loadEnv();
  return cached;
})();

