"use client";

import { useTranslations } from "next-intl";

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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="font-heading shrink-0 text-lg font-medium tracking-tight">
          monis
        </Link>
        <nav className="flex min-w-0 items-center gap-2 text-sm sm:gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:text-foreground truncate transition-colors",
                pathname === link.href && "text-foreground font-medium",
              )}
            >
              <span className="sm:hidden">{link.short}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
