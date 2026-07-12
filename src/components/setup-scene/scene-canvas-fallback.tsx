"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/** Fills its parent — must share the same size shell as the loaded canvas. */
export function SceneCanvasChunkFallback({ className }: { className?: string }) {
  const t = useTranslations("SetupScene");

  return (
    <div
      className={cn(
        "bg-muted/40 flex size-full min-h-0 items-center justify-center rounded-[inherit]",
        className,
      )}
      aria-busy="true"
    >
      <p className="text-muted-foreground text-sm">{t("loading")}</p>
    </div>
  );
}
