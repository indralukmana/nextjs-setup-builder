"use client";

import { useQuery } from "@tanstack/react-query";

import { FALLBACK_RATES, type ExchangeRates, type ExchangeRatesResponse } from "@/lib/currency";

async function fetchExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch("/api/exchange-rates");
  if (!response.ok) {
    throw new Error(`exchange_rates_${response.status}`);
  }
  return (await response.json()) as ExchangeRatesResponse;
}

export function useExchangeRates() {
  return useQuery({
    queryKey: ["exchange-rates", "USD"],
    queryFn: fetchExchangeRates,
    placeholderData: {
      base: "USD",
      date: "",
      rates: FALLBACK_RATES,
      source: "fallback",
    },
    select: (data): ExchangeRates => data.rates,
  });
}
