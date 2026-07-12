import { describe, expect, it } from "vitest";

import { webVitalMetricSchema } from "@/lib/web-vitals";

describe("webVitalMetricSchema", () => {
  it("accepts a valid metric payload", () => {
    const parsed = webVitalMetricSchema.parse({
      name: "LCP",
      id: "v3-123",
      value: 1820.4,
      rating: "good",
      navigationType: "navigate",
      delta: 1820.4,
    });

    expect(parsed.name).toBe("LCP");
    expect(parsed.value).toBe(1820.4);
  });

  it("rejects unknown metric names and non-finite values", () => {
    expect(
      webVitalMetricSchema.safeParse({
        name: "FPS",
        id: "v3-1",
        value: 12,
      }).success,
    ).toBe(false);

    expect(
      webVitalMetricSchema.safeParse({
        name: "CLS",
        id: "v3-2",
        value: Number.NaN,
      }).success,
    ).toBe(false);
  });
});
