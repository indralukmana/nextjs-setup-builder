import { getProductSync } from "@/lib/catalog-api";

/** Fixed display rate — catalog prices stay in USD-week units. */
export const USD_TO_IDR = 16_000;

export function getWeeklyTotal(productIds: string[]) {
  return productIds.reduce((total, id) => {
    const product = getProductSync(id);
    return total + (product?.pricePerWeek ?? 0);
  }, 0);
}

export function getRentalTotal(weeklyTotal: number, weeks: number) {
  return weeklyTotal * weeks;
}

export function usdToIdr(amountUsd: number) {
  return Math.round(amountUsd * USD_TO_IDR);
}

export function formatMoney(amountUsd: number, locale: string) {
  if (locale === "id" || locale.startsWith("id-")) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(usdToIdr(amountUsd));
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

/** @deprecated Prefer formatMoney(amount, locale). */
export function formatUsd(amount: number) {
  return formatMoney(amount, "en");
}
