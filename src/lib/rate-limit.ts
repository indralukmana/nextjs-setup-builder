/** Simple sliding-window rate limiter for serverless-friendly in-memory use. */
export function createRateLimiter(options: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return {
    allow(key: string, now = Date.now()) {
      const windowStart = now - options.windowMs;
      const recent = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
      if (recent.length >= options.limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      return true;
    },
    /** Test helper */
    reset() {
      hits.clear();
    },
  };
}

export const webVitalsRateLimiter = createRateLimiter({
  limit: 60,
  windowMs: 60_000,
});

export function clientKeyFromRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
