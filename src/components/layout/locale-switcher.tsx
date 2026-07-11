"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-md border px-1 py-0.5 text-xs">
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          className={cn(
            "rounded px-1.5 py-0.5 uppercase",
            item === locale ? "bg-foreground text-background" : "text-muted-foreground",
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
