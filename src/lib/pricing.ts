import { getProductSync } from "@/lib/catalog-api";
import {
  convertFromUsd,
  FALLBACK_RATES,
  formatNumberLocale,
  type CurrencyCode,
  type ExchangeRates,
} from "@/lib/currency";

/** @deprecated Prefer live FX rates from /api/exchange-rates. Kept as IDR fallback. */
export const USD_TO_IDR = FALLBACK_RATES.IDR;

export function getWeeklyTotal(productIds: string[]) {
  return productIds.reduce((total, id) => {
    const product = getProductSync(id);
    return total + (product?.pricePerWeek ?? 0);
  }, 0);
}

export function getRentalTotal(weeklyTotal: number, weeks: number) {
  return weeklyTotal * weeks;
}

export function usdToIdr(amountUsd: number, rates: ExchangeRates = FALLBACK_RATES) {
  return convertFromUsd(amountUsd, "IDR", rates);
}

type FormatMoneyOptions = {
  currency: CurrencyCode;
  locale?: string;
  rates?: ExchangeRates;
};

export function formatMoney(amountUsd: number, options: FormatMoneyOptions | string) {
  // Legacy: formatMoney(amount, locale) — id → IDR fallback, else USD
  if (typeof options === "string") {
    const locale = options;
    const currency: CurrencyCode = locale === "id" || locale.startsWith("id-") ? "IDR" : "USD";
    return formatMoney(amountUsd, { currency, locale, rates: FALLBACK_RATES });
  }

  const { currency, locale = "en", rates = FALLBACK_RATES } = options;
  const amount = convertFromUsd(amountUsd, currency, rates);

  return new Intl.NumberFormat(formatNumberLocale(locale), {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** @deprecated Prefer formatMoney(amount, { currency, locale, rates }). */
export function formatUsd(amount: number) {
  return formatMoney(amount, { currency: "USD", locale: "en", rates: FALLBACK_RATES });
}
