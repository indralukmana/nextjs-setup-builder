"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, type ComponentType } from "react";

import { StoreReady } from "@/components/setup-builder/store-ready";
import { WorkspaceSelectedList } from "@/components/setup-builder/workspace-selected-list";
import { SceneCanvasChunkFallback } from "@/components/setup-scene/scene-canvas-fallback";
import { useIsE2e } from "@/hooks/use-is-e2e";
import { getProductSync } from "@/lib/catalog-api";
import { buildSceneSlots, type SceneSlot } from "@/lib/scene-slots";
import { cn } from "@/lib/utils";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type SceneCanvasProps = {
  slots: SceneSlot[];
  className?: string;
};

/**
 * Loads the R3F canvas only after mount when not in e2e.
 * Avoids next/dynamic prefetch pulling Three/WebGL into Playwright runs.
 */
function LiveSetupSceneCanvas({ slots, className }: SceneCanvasProps) {
  const [Canvas, setCanvas] = useState<ComponentType<SceneCanvasProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/setup-scene/setup-scene-canvas").then((mod) => {
      if (!cancelled) {
        setCanvas(() => mod.SetupSceneCanvas);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Canvas) {
    return <SceneCanvasChunkFallback className="absolute inset-0 size-full" />;
  }

  return <Canvas slots={slots} className={className} />;
}

/** Static stand-in so Playwright never loads WebGL/GLTF (SwiftShader stalls clicks on CI). */
function SetupSceneE2eStub() {
  const t = useTranslations("SetupScene");

  return (
    <div
      className="bg-muted/40 absolute inset-0 flex size-full items-center justify-center rounded-[inherit]"
      aria-label="Interactive 3D scene of your monis setup"
      data-e2e-scene-stub=""
    >
      <p className="text-muted-foreground text-sm">{t("e2eStub")}</p>
    </div>
  );
}

type SetupScenePreviewProps = {
  className?: string;
  canvasClassName?: string;
  /** When true, show empty-state hint above the canvas. */
  showEmptyHint?: boolean;
};

export function SetupScenePreview({
  className,
  canvasClassName,
  showEmptyHint = true,
}: SetupScenePreviewProps) {
  const t = useTranslations("SetupScene");

  return (
    <StoreReady className={className} label={t("loading")}>
      <SetupScenePreviewContent canvasClassName={canvasClassName} showEmptyHint={showEmptyHint} />
    </StoreReady>
  );
}

function SetupScenePreviewContent({
  canvasClassName,
  showEmptyHint,
}: {
  canvasClassName?: string;
  showEmptyHint: boolean;
}) {
  const t = useTranslations("SetupScene");
  const isE2e = useIsE2e();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const isEmpty =
    (!deskId || deskId === "") &&
    (!chairId || chairId === "") &&
    accessoryIds.length === 0 &&
    monitorCount === 0;
  const slots = buildSceneSlots({
    deskId: deskId || "",
    chairId: chairId || "",
    accessoryIds,
    monitorCount,
  });
  const lineIds = expandSetupLineIds({
    deskId: deskId || "",
    chairId: chairId || "",
    accessoryIds,
    monitorCount,
  });
  const products = [
    ...new Map(
      lineIds
        .map((id) => getProductSync(id))
        .filter((product) => product != null)
        .map((product) => [product.id, product]),
    ).values(),
  ];

  return (
    <section
      className="flex size-full min-h-0 flex-col gap-3 overflow-hidden"
      aria-label="Workspace preview"
    >
      {showEmptyHint && isEmpty ? (
        <p className="text-muted-foreground shrink-0 rounded-lg border border-dashed px-4 py-3 text-sm">
          {t("emptyHint")}
        </p>
      ) : null}
      {/* Stable size shell — chunk fallback and canvas both fill this, so load doesn't shift layout. */}
      <div
        className={cn(
          "bg-muted/20 relative overflow-hidden rounded-xl border",
          canvasClassName ?? "h-[min(55vh,28rem)] min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem]",
        )}
      >
        {isE2e === null ? (
          <SceneCanvasChunkFallback className="absolute inset-0 size-full" />
        ) : isE2e ? (
          <SetupSceneE2eStub />
        ) : (
          <LiveSetupSceneCanvas slots={slots} className="absolute inset-0 size-full" />
        )}
      </div>
      <WorkspaceSelectedList products={products} />
    </section>
  );
}
