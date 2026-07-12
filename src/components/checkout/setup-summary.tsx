"use client";

import { useTranslations } from "next-intl";

import { DeliveryNote } from "@/components/checkout/delivery-note";
import { SetupSummaryEmpty } from "@/components/checkout/setup-summary-empty";
import { SetupSummaryHeader } from "@/components/checkout/setup-summary-header";
import { SetupSummaryItem } from "@/components/checkout/setup-summary-item";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { useFormatMoney } from "@/hooks/use-format-money";
import { getProductSync } from "@/lib/catalog-api";
import { getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  heading: string;
  editLabel: string;
  weeklyLabel: string;
  emptyLabel: string;
  deliveryTitle: string;
  deliveryBody: string;
};

export function SetupSummary({
  heading,
  editLabel,
  weeklyLabel,
  emptyLabel,
  deliveryTitle,
  deliveryBody,
}: Props) {
  const t = useTranslations("Checkout");

  return (
    <StoreReady className="min-h-64" label={t("loadingSummary")}>
      <SetupSummaryContent
        heading={heading}
        editLabel={editLabel}
        weeklyLabel={weeklyLabel}
        emptyLabel={emptyLabel}
        deliveryTitle={deliveryTitle}
        deliveryBody={deliveryBody}
      />
    </StoreReady>
  );
}

function SetupSummaryContent({
  heading,
  editLabel,
  weeklyLabel,
  emptyLabel,
  deliveryTitle,
  deliveryBody,
}: Props) {
  const formatMoney = useFormatMoney();
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
    <section
      aria-label="Setup summary"
      className="border-border/80 flex flex-col gap-4 rounded-xl border bg-background/50 p-4 sm:p-5"
    >
      <SetupSummaryHeader heading={heading} editLabel={editLabel} />

      {summaryRows.length === 0 ? (
        <SetupSummaryEmpty emptyLabel={emptyLabel} editLabel={editLabel} />
      ) : (
        <>
          <ul className="divide-border/70 overflow-hidden rounded-lg border bg-background/60">
            {summaryRows.map(({ product, quantity }) => (
              <SetupSummaryItem key={product.id} product={product} quantity={quantity} />
            ))}
          </ul>
          <p className="text-muted-foreground px-0.5 text-sm tabular-nums">
            {weeklyLabel} {formatMoney(weeklyTotal)}
          </p>
        </>
      )}

      <DeliveryNote title={deliveryTitle} body={deliveryBody} />
    </section>
  );
}
