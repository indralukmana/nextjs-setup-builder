"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { CatalogPanel } from "@/components/setup-builder/catalog-panel";
import { SetupSelectionChips } from "@/components/setup-builder/setup-selection-chips";
import { SummaryBar } from "@/components/setup-builder/summary-bar";
import { SetupScenePreview } from "@/components/setup-scene/setup-scene-preview";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  setupSceneLabel: string;
};

export function SetupBuilderWorkspace({ title, setupSceneLabel }: Props) {
  const t = useTranslations("SetupBuilder.catalogSheet");
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    if (!catalogOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCatalogOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [catalogOpen]);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-hidden p-3 sm:gap-4 sm:p-4 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-4 lg:p-4">
      <section className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <div className="relative min-h-0 flex-1">
          <SetupScenePreview
            showEmptyHint={false}
            className="absolute inset-0 flex min-h-0 flex-col"
            canvasClassName="h-full min-h-0 flex-1 rounded-2xl border"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3">
            <h1 className="font-heading bg-background/80 pointer-events-auto max-w-[min(100%,18rem)] truncate rounded-lg px-2.5 py-1.5 text-lg tracking-tight shadow-sm backdrop-blur sm:text-xl">
              {title}
            </h1>
            <Link
              href="/setup-scene"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "pointer-events-auto shrink-0 bg-background/80 shadow-sm backdrop-blur",
              )}
            >
              {setupSceneLabel}
            </Link>
          </div>
          <SetupSelectionChips className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3" />
        </div>
        <SummaryBar />
        <button
          type="button"
          className={cn(buttonVariants({ variant: "secondary" }), "h-10 w-full shrink-0 lg:hidden")}
          onClick={() => setCatalogOpen(true)}
        >
          {t("open")}
        </button>
      </section>

      {/* Desktop rail */}
      <aside className="border-border hidden min-h-0 flex-col overflow-hidden rounded-2xl border bg-background/60 p-3 lg:flex">
        <CatalogPanel />
      </aside>

      {/* Mobile catalog sheet */}
      {catalogOpen ? (
        <dialog
          className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 lg:hidden"
          open
          aria-label={t("open")}
          onCancel={(event) => {
            event.preventDefault();
            setCatalogOpen(false);
          }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={t("close")}
            onClick={() => setCatalogOpen(false)}
          />
          <div className="border-border bg-background absolute inset-x-0 bottom-0 flex h-[min(78dvh,36rem)] flex-col overflow-hidden rounded-t-2xl border-t shadow-lg">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b px-3 py-2.5">
              <p className="text-sm font-medium">{t("open")}</p>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                onClick={() => setCatalogOpen(false)}
              >
                {t("close")}
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden p-3">
              <CatalogPanel />
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
