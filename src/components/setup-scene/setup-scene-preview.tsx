"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { StoreReady } from "@/components/setup-builder/store-ready";
import { WorkspaceSelectedList } from "@/components/setup-builder/workspace-selected-list";
import { SceneCanvasChunkFallback } from "@/components/setup-scene/scene-loading-overlay";
import { getProductSync } from "@/lib/catalog-api";
import { buildSceneSlots } from "@/lib/scene-slots";
import { cn } from "@/lib/utils";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

const SetupSceneCanvas = dynamic(
  () => import("@/components/setup-scene/setup-scene-canvas").then((mod) => mod.SetupSceneCanvas),
  {
    ssr: false,
    loading: () => <SceneCanvasChunkFallback />,
  },
);

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
        <SetupSceneCanvas slots={slots} className="absolute inset-0 size-full" />
      </div>
      <WorkspaceSelectedList products={products} />
    </section>
  );
}
