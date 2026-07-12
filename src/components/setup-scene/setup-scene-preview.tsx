"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { StoreReady } from "@/components/setup-builder/store-ready";
import { WorkspaceSelectedList } from "@/components/setup-builder/workspace-selected-list";
import { getProductSync } from "@/lib/catalog-api";
import { buildSceneSlots } from "@/lib/scene-slots";
import { cn } from "@/lib/utils";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

const SetupSceneCanvas = dynamic(
  () => import("@/components/setup-scene/setup-scene-canvas").then((mod) => mod.SetupSceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-muted/40 flex min-h-[20rem] items-center justify-center rounded-2xl border sm:min-h-[24rem]"
        aria-busy="true"
      >
        <span className="text-muted-foreground text-sm">…</span>
      </div>
    ),
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
    <StoreReady className={cn("min-h-[20rem]", className)} label={t("loading")}>
      <SetupScenePreviewContent
        className={className}
        canvasClassName={canvasClassName}
        showEmptyHint={showEmptyHint}
      />
    </StoreReady>
  );
}

function SetupScenePreviewContent({
  className,
  canvasClassName,
  showEmptyHint,
}: {
  className?: string;
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
    <section className={cn("flex flex-col gap-3", className)} aria-label="Workspace preview">
      {showEmptyHint && isEmpty ? (
        <p className="text-muted-foreground shrink-0 rounded-xl border border-dashed px-4 py-3 text-sm">
          {t("emptyHint")}
        </p>
      ) : null}
      <SetupSceneCanvas
        slots={slots}
        className={cn(
          "bg-muted/20 h-[min(55vh,28rem)] min-h-[20rem] overflow-hidden rounded-2xl border sm:min-h-[24rem] md:min-h-[28rem]",
          canvasClassName,
        )}
      />
      <WorkspaceSelectedList products={products} />
    </section>
  );
}
