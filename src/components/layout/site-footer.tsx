"use client";

import { usePathname } from "@/i18n/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/setup-builder" || pathname === "/checkout") {
    return null;
  }

  return (
    <footer className="border-border/50 mt-auto border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 text-xs">
        <span className="font-heading text-foreground/80 text-sm tracking-tight">monis</span>
        <span>Bali workspace rentals · powered for remote work</span>
      </div>
    </footer>
  );
}
