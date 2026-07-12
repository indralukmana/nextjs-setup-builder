import { describe, expect, it } from "vitest";

import { FALLBACK_RATES } from "@/lib/currency";
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
    expect(getWeeklyTotal(["desk-bollsidan", "chair-alefjall"])).toBe(32);
  });

  it("multiplies weekly total by rental weeks", () => {
    expect(getRentalTotal(32, 4)).toBe(128);
  });

  it("formats usd without cents", () => {
    expect(formatUsd(32)).toBe("$32");
    expect(formatMoney(32, { currency: "USD", locale: "en" })).toBe("$32");
  });

  it("converts and formats idr with fallback rates", () => {
    expect(usdToIdr(32)).toBe(32 * USD_TO_IDR);
    expect(formatMoney(32, { currency: "IDR", locale: "id", rates: FALLBACK_RATES })).toMatch(
      /Rp\s?512\.000/,
    );
  });

  it("formats eur with fallback rates", () => {
    expect(formatMoney(100, { currency: "EUR", locale: "de", rates: FALLBACK_RATES })).toMatch(
      /92/,
    );
  });

  it("keeps legacy locale-based formatMoney for id", () => {
    expect(formatMoney(32, "id")).toMatch(/Rp\s?512\.000/);
  });
});
