"use client";

import { useTranslations } from "next-intl";

import { buildStageSlots } from "@/components/setup-builder/preview-layers";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { WorkspaceSelectedList } from "@/components/setup-builder/workspace-selected-list";
import { WorkspaceStageBackdrop } from "@/components/setup-builder/workspace-stage-backdrop";
import { WorkspaceStageLayers } from "@/components/setup-builder/workspace-stage-layers";
import { getProductSync } from "@/lib/catalog-api";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function WorkspacePreview() {
  const t = useTranslations("SetupBuilder");

  return (
    <StoreReady className="min-h-[22rem] md:min-h-[28rem]" label={t("loadingPreview")}>
      <WorkspacePreviewContent />
    </StoreReady>
  );
}

function WorkspacePreviewContent() {
  const t = useTranslations("SetupBuilder");
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const products = selectedIds.map((id) => getProductSync(id)).filter((product) => product != null);
  const slots = buildStageSlots(products);

  return (
    <section
      aria-label="Workspace preview"
      className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-[#d6c4a8]/80 bg-[linear-gradient(180deg,#f7efe2_0%,#e8d7c0_48%,#d7c3a6_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:min-h-[22rem] md:min-h-[28rem]"
    >
      <WorkspaceStageBackdrop />

      <p className="text-foreground/80 absolute top-3 left-3 z-50 text-[0.7rem] font-semibold tracking-[0.18em] uppercase sm:top-4 sm:left-4 sm:text-xs">
        {t("liveSetup")}
      </p>

      {slots.length === 0 ? (
        <p className="text-muted-foreground absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-sm">
          {t("emptyPreview")}
        </p>
      ) : (
        <WorkspaceStageLayers slots={slots} />
      )}

      <WorkspaceSelectedList products={products} />
    </section>
  );
}
