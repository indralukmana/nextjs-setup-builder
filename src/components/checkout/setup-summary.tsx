"use client";

import { useLocale, useTranslations } from "next-intl";

import { SetupSummaryEmpty } from "@/components/checkout/setup-summary-empty";
import { SetupSummaryHeader } from "@/components/checkout/setup-summary-header";
import { SetupSummaryItem } from "@/components/checkout/setup-summary-item";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { getProductSync } from "@/lib/catalog-api";
import { formatMoney, getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

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
  const locale = useLocale();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const selectedIds = expandSetupLineIds({ deskId, chairId, accessoryIds, monitorCount });
  const weeklyTotal = getWeeklyTotal(selectedIds);

  const summaryRows: {
    product: NonNullable<ReturnType<typeof getProductSync>>;
    quantity: number;
  }[] = [];
  const seen = new Map<string, number>();
  for (const id of selectedIds) {
    const product = getProductSync(id);
    if (!product) continue;
    const index = seen.get(id);
    if (index === undefined) {
      seen.set(id, summaryRows.length);
      summaryRows.push({ product, quantity: 1 });
    } else {
      summaryRows[index]!.quantity += 1;
    }
  }

  return (
    <section aria-label="Setup summary" className="flex flex-col gap-5">
      <SetupSummaryHeader
        heading={heading}
        editLabel={editLabel}
        subtitle={
          summaryRows.length > 0 ? `${weeklyLabel} ${formatMoney(weeklyTotal, locale)}` : emptyLabel
        }
      />

      {summaryRows.length === 0 ? (
        <SetupSummaryEmpty emptyLabel={emptyLabel} editLabel={editLabel} />
      ) : (
        <ul className="divide-border/80 overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.35))]">
          {summaryRows.map(({ product, quantity }) => (
            <SetupSummaryItem key={product.id} product={product} quantity={quantity} />
          ))}
        </ul>
      )}
    </section>
  );
}
