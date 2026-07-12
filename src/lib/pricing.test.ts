import { describe, expect, it } from "vitest";

import {
  formatMoney,
  formatUsd,
  getRentalTotal,
  getWeeklyTotal,
  usdToIdr,
  USD_TO_IDR,
} from "@/lib/pricing";

describe("pricing", () => {
  it("sums weekly prices for selected products", () => {
    expect(getWeeklyTotal(["desk-electric", "chair-ergonomic"])).toBe(32);
  });

  it("multiplies weekly total by rental weeks", () => {
    expect(getRentalTotal(32, 4)).toBe(128);
  });

  it("formats usd without cents", () => {
    expect(formatUsd(32)).toBe("$32");
    expect(formatMoney(32, "en")).toBe("$32");
  });

  it("converts and formats idr for Indonesian locale", () => {
    expect(usdToIdr(32)).toBe(32 * USD_TO_IDR);
    expect(formatMoney(32, "id")).toMatch(/Rp\s?512\.000/);
  });
});
