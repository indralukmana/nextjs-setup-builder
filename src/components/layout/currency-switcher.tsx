"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import { CURRENCY_CODES } from "@/lib/currency";
import { cn } from "@/lib/utils";
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

  return (
    <fieldset className="flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs">
      <legend className="sr-only">{t("label")}</legend>
      {CURRENCY_CODES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setCurrency(code)}
          aria-pressed={code === currency}
          className={cn(
            "rounded-sm px-1.5 py-0.5 uppercase",
            code === currency ? "bg-foreground text-background" : "text-muted-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </fieldset>
  );
}
