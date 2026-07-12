export const CURRENCY_CODES = ["USD", "EUR", "IDR"] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

/** Rates relative to 1 USD. Used when the live FX feed is unavailable. */
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  IDR: 16_000,
};

export type ExchangeRates = Record<CurrencyCode, number>;

export type ExchangeRatesResponse = {
  base: "USD";
  date: string;
  rates: ExchangeRates;
  source: "frankfurter" | "fallback";
};

export function isCurrencyCode(value: string): value is CurrencyCode {
  return (CURRENCY_CODES as readonly string[]).includes(value);
}

export function defaultCurrencyForLocale(locale: string): CurrencyCode {
  if (locale === "id" || locale.startsWith("id-")) return "IDR";
  if (locale === "de" || locale.startsWith("de-")) return "EUR";
  return "USD";
}

export function convertFromUsd(
  amountUsd: number,
  currency: CurrencyCode,
  rates: ExchangeRates,
): number {
  const rate = rates[currency] || FALLBACK_RATES[currency];
  return Math.round(amountUsd * rate);
}

export function formatNumberLocale(locale: string): string {
  if (locale.startsWith("id")) return "id-ID";
  if (locale.startsWith("de")) return "de-DE";
  return "en-US";
}
