"use client";

import { useProgress } from "@react-three/drei";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/** HTML overlay driven by drei’s DefaultLoadingManager (GLTF / Environment / etc.). */
export function SceneAssetLoadingOverlay() {
  const t = useTranslations("SetupScene");
  const { active, progress } = useProgress();
  const pct = Math.min(100, Math.round(progress));
  // DefaultLoadingManager can leave `active` true at 100% (drei/three quirk); never block hits then.
  const busy = active && pct < 100;

  return (
    <div
      className={cn(
        "bg-background/70 absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] backdrop-blur-sm transition-opacity duration-500 ease-out",
        busy ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-busy={busy}
      aria-live="polite"
      aria-hidden={!busy}
    >
      <p className="text-muted-foreground text-sm tabular-nums">
        {t("loadingAssets", { progress: pct })}
      </p>
    </div>
  );
}
