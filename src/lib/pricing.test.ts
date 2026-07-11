import { describe, expect, it } from "vitest";

import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";

describe("pricing", () => {
  it("sums weekly prices for selected products", () => {
    expect(getWeeklyTotal(["desk-electric", "chair-ergonomic"])).toBe(32);
  });

  it("multiplies weekly total by rental weeks", () => {
    expect(getRentalTotal(32, 4)).toBe(128);
  });

  it("formats usd without cents", () => {
    expect(formatUsd(32)).toBe("$32");
  });
});
