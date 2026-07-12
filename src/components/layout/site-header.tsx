"use client";

import { useTranslations } from "next-intl";

import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home"), short: t("homeShort") },
    { href: "/setup-builder", label: t("setupBuilder"), short: t("setupBuilderShort") },
    { href: "/checkout", label: t("checkout"), short: t("checkoutShort") },
  ] as const;

  return (
    <header className="border-border/50 bg-background/75 sticky top-0 z-40 border-b backdrop-blur-md">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground focus:ring-ring absolute top-2 left-2 z-50 rounded-md px-3 py-2 text-sm font-medium opacity-0 focus:opacity-100 focus:ring-2 focus:outline-none"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="font-heading shrink-0 text-lg font-medium tracking-tight">
          monis
        </Link>
        <nav className="flex min-w-0 items-center gap-2 text-sm sm:gap-4" aria-label="Primary">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "truncate rounded-md px-2 py-1 transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "bg-secondary text-foreground",
                )}
              >
                <span className="sm:hidden">{link.short}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
          <CurrencySwitcher />
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
