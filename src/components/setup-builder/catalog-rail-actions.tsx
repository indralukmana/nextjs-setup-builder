"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { ClearSetupButton } from "@/components/setup-builder/clear-setup-button";
import { CopySetupLink } from "@/components/setup-builder/copy-setup-link";
import { ResetSetupButton } from "@/components/setup-builder/reset-setup-button";

/** Compact actions for the catalog rail: copy + overflow for clear/reset. */
export function CatalogRailActions() {
  const t = useTranslations("SetupBuilder");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const el = detailsRef.current;
      if (!el?.open) return;
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false;
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <CopySetupLink className="min-w-0 flex-1" />
      <details ref={detailsRef} className="relative shrink-0">
        <summary className="border-input bg-background hover:bg-muted/60 inline-flex h-8 cursor-pointer list-none items-center rounded-lg border px-2.5 text-sm font-medium select-none [&::-webkit-details-marker]:hidden">
          {t("actionsMenu")}
        </summary>
        <div className="border-border bg-background absolute top-full right-0 z-20 mt-1 flex w-44 flex-col gap-1 rounded-xl border p-1.5 shadow-md">
          <ResetSetupButton className="w-full justify-start" onDone={closeMenu} />
          <ClearSetupButton className="w-full justify-start" onDone={closeMenu} />
        </div>
      </details>
    </div>
  );
}
