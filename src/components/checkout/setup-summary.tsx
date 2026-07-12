"use client";

import { useTranslations } from "next-intl";

import { SetupSummaryEmpty } from "@/components/checkout/setup-summary-empty";
import { SetupSummaryHeader } from "@/components/checkout/setup-summary-header";
import { SetupSummaryItem } from "@/components/checkout/setup-summary-item";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { getProductById } from "@/data/catalog";
import { formatUsd, getWeeklyTotal } from "@/lib/pricing";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  heading: string;
  editLabel: string;
  weeklyLabel: string;
  emptyLabel: string;
};

export function SetupSummary({ heading, editLabel, weeklyLabel, emptyLabel }: Props) {
  const t = useTranslations("Checkout");

  return (
    <StoreReady className="min-h-64" label={t("loadingSummary")}>
      <SetupSummaryContent
        heading={heading}
        editLabel={editLabel}
        weeklyLabel={weeklyLabel}
        emptyLabel={emptyLabel}
      />
    </StoreReady>
  );
}

function SetupSummaryContent({ heading, editLabel, weeklyLabel, emptyLabel }: Props) {
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const products = selectedIds.map((id) => getProductById(id)).filter((product) => product != null);
  const weeklyTotal = getWeeklyTotal(selectedIds);

  return (
    <section aria-label="Setup summary" className="flex flex-col gap-5">
      <SetupSummaryHeader
        heading={heading}
        editLabel={editLabel}
        subtitle={products.length > 0 ? `${weeklyLabel} ${formatUsd(weeklyTotal)}` : emptyLabel}
      />

      {products.length === 0 ? (
        <SetupSummaryEmpty emptyLabel={emptyLabel} editLabel={editLabel} />
      ) : (
        <ul className="divide-border/80 overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.35))]">
          {products.map((product) => (
            <SetupSummaryItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}
