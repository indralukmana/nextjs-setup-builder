"use client";

import { useLocale } from "next-intl";

import { useExchangeRates } from "@/hooks/use-exchange-rates";
import { FALLBACK_RATES } from "@/lib/currency";
import { formatMoney } from "@/lib/pricing";
import { useCurrencyStore } from "@/store/currency-store";

export function useFormatMoney() {
  const locale = useLocale();
  const currency = useCurrencyStore((state) => state.currency);
  const { data: rates } = useExchangeRates();

  return (amountUsd: number) =>
    formatMoney(amountUsd, {
      currency,
      locale,
      rates: rates ?? FALLBACK_RATES,
    });
}
