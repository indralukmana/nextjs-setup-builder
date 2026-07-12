"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const items = routing.locales.map((item) => ({
    label: item.toUpperCase(),
    value: item,
  }));

  return (
    <Select
      items={items}
      value={locale}
      onValueChange={(value) => {
        if (!value) return;
        router.replace(pathname, { locale: value as Locale });
      }}
    >
      <SelectTrigger size="sm" aria-label={t("localeLabel")} className="min-w-16 uppercase">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end">
        {routing.locales.map((item) => (
          <SelectItem key={item} value={item} className="uppercase">
            {item.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
