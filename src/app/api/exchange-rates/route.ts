import { NextResponse } from "next/server";
import { z } from "zod";

import { FALLBACK_RATES, type ExchangeRates, type ExchangeRatesResponse } from "@/lib/currency";

const frankfurterSchema = z.object({
  base: z.string(),
  date: z.string(),
  rates: z.record(z.string(), z.number()),
});

function buildRates(partial: Record<string, number>): ExchangeRates {
  return {
    USD: 1,
    EUR: partial.EUR ?? FALLBACK_RATES.EUR,
    IDR: partial.IDR ?? FALLBACK_RATES.IDR,
  };
}

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,IDR", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`frankfurter_${response.status}`);
    }

    const parsed = frankfurterSchema.safeParse(await response.json());
    if (!parsed.success) {
      throw new Error("frankfurter_invalid");
    }

    const body: ExchangeRatesResponse = {
      base: "USD",
      date: parsed.data.date,
      rates: buildRates(parsed.data.rates),
      source: "frankfurter",
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn(
      JSON.stringify({
        type: "exchange-rates-fallback",
        reason: error instanceof Error ? error.message : "unknown",
      }),
    );

    const body: ExchangeRatesResponse = {
      base: "USD",
      date: new Date().toISOString().slice(0, 10),
      rates: { ...FALLBACK_RATES },
      source: "fallback",
    };

    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  }
}
