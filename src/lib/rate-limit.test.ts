import { describe, expect, it } from "vitest";

import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows requests under the limit and blocks when exceeded", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000 });

    expect(limiter.allow("a", 0)).toBe(true);
    expect(limiter.allow("a", 10)).toBe(true);
    expect(limiter.allow("a", 20)).toBe(false);
    expect(limiter.allow("b", 20)).toBe(true);
  });

  it("expires hits outside the window", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 100 });

    expect(limiter.allow("a", 0)).toBe(true);
    expect(limiter.allow("a", 50)).toBe(false);
    expect(limiter.allow("a", 101)).toBe(true);
  });
});
