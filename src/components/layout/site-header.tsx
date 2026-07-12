"use client";

import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/setup-builder", label: t("setupBuilder") },
    { href: "/checkout", label: t("checkout") },
  ] as const;

  return (
    <header className="border-border/50 bg-background/75 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="font-heading text-lg font-medium tracking-tight">
          monis
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                pathname === link.href && "text-foreground font-medium",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
