"use client";

import { useTranslations } from "next-intl";

import { useProductCopy } from "@/hooks/use-product-copy";
import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { cn } from "@/lib/utils";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/85 max-w-[10rem] truncate rounded-lg border px-2 py-1 text-xs shadow-sm backdrop-blur sm:max-w-[12rem] sm:text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground ml-1 font-medium">{value}</span>
    </div>
  );
}

function ProductChip({ label, productId }: { label: string; productId: string }) {
  const { name } = useProductCopy(productId);
  return <Chip label={label} value={name} />;
}

type Props = {
  className?: string;
};

export function SetupSelectionChips({ className }: Props) {
  const t = useTranslations("SetupBuilder.selectionChips");
  const hydrated = useSetupBuilderHydrated();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);

  const monitorsValue =
    monitorCount === 0 ? t("monitorsNone") : t("monitorsCount", { count: monitorCount });

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 transition-opacity duration-300 ease-out",
        hydrated ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-label={t("ariaLabel")}
      aria-hidden={!hydrated}
    >
      {deskId ? (
        <ProductChip label={t("desk")} productId={deskId} />
      ) : (
        <Chip label={t("desk")} value={t("empty")} />
      )}
      {chairId ? (
        <ProductChip label={t("chair")} productId={chairId} />
      ) : (
        <Chip label={t("chair")} value={t("empty")} />
      )}
      <Chip label={t("monitors")} value={monitorsValue} />
    </div>
  );
}
