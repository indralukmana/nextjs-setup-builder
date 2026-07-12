"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { CatalogPanel } from "@/components/setup-builder/catalog-panel";
import { SetupSelectionChips } from "@/components/setup-builder/setup-selection-chips";
import { SummaryBar } from "@/components/setup-builder/summary-bar";
import { SetupScenePreview } from "@/components/setup-scene/setup-scene-preview";
import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
};

export function SetupBuilderWorkspace({ title }: Props) {
  const t = useTranslations("SetupBuilder.catalogSheet");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const isLg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!catalogOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCatalogOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [catalogOpen]);

  useEffect(() => {
    if (isLg) setCatalogOpen(false);
  }, [isLg]);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)] gap-3 overflow-hidden p-3 sm:gap-4 sm:p-4 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-4 lg:p-4">
      <section className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <h1 className="sr-only">{title}</h1>
          <SetupScenePreview
            showEmptyHint={false}
            className="absolute inset-0 flex min-h-0 flex-col overflow-hidden"
            canvasClassName="h-full min-h-0 flex-1 sm:min-h-0 md:min-h-0"
          />
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

      {isLg ? (
        <aside className="border-border flex min-h-0 max-h-full flex-col overflow-hidden rounded-xl border bg-background/60 p-3">
          <CatalogPanel />
        </aside>
      ) : catalogOpen ? (
        <dialog
          className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0"
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
            aria-label={t("dismiss")}
            onClick={() => setCatalogOpen(false)}
          />
          <div className="border-border bg-background absolute inset-0 flex h-full flex-col overflow-hidden shadow-lg">
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
