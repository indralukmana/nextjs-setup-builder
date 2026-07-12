"use client";

import { useProgress } from "@react-three/drei";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/** HTML overlay driven by drei’s DefaultLoadingManager (GLTF / Environment / etc.). */
export function SceneAssetLoadingOverlay() {
  const t = useTranslations("SetupScene");
  const { active, progress } = useProgress();
  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      className={cn(
        "bg-background/70 absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] backdrop-blur-sm transition-opacity duration-500 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-busy={active}
      aria-live="polite"
      aria-hidden={!active}
    >
      <p className="text-muted-foreground text-sm tabular-nums">
        {t("loadingAssets", { progress: pct })}
      </p>
    </div>
  );
}

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
