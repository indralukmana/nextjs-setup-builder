"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_CODES } from "@/lib/currency";
import { useCurrencyStore } from "@/store/currency-store";

export function CurrencySwitcher() {
  const t = useTranslations("Currency");
  const locale = useLocale();
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const ensureDefaultForLocale = useCurrencyStore((state) => state.ensureDefaultForLocale);

  useEffect(() => {
    ensureDefaultForLocale(locale);
  }, [locale, ensureDefaultForLocale]);

  const items = CURRENCY_CODES.map((code) => ({ label: code, value: code }));

  return (
    <Select
      items={items}
      value={currency}
      onValueChange={(value) => {
        if (!value) return;
        setCurrency(value as (typeof CURRENCY_CODES)[number]);
      }}
    >
      <SelectTrigger size="sm" aria-label={t("label")} className="min-w-20 uppercase">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end">
        {CURRENCY_CODES.map((code) => (
          <SelectItem key={code} value={code} className="uppercase">
            {code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
