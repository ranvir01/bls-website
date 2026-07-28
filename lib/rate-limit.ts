/**
 * In-memory fixed-window rate limiter.
 *
 * Scoped to a single server instance, which is the right trade-off here: the
 * threat is casual form spam and runaway image-generation cost, not a
 * distributed attack. A shared store (Upstash/Redis) would be the upgrade if
 * the site ever runs on more than one warm instance — see docs/DEPLOYMENT.md.
 *
 * Entries are swept lazily on access so the map cannot grow without bound.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
let lastSweep = 0;
const SWEEP_INTERVAL_MS = 60_000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

/**
 * Best-effort client IP. Netlify and Vercel both populate x-forwarded-for;
 * the first entry is the client, the rest are proxies.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-nf-client-connection-ip') ?? headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}
