"use client";

import { useTranslations } from "next-intl";

import { ProductIllustration } from "@/components/setup-builder/preview-layers";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { buttonVariants } from "@/components/ui/button";
import { getProductById } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import { formatUsd, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
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
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl tracking-tight">{heading}</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {products.length > 0 ? (
              <>
                {weeklyLabel} {formatUsd(weeklyTotal)}
              </>
            ) : (
              emptyLabel
            )}
          </p>
        </div>
        <Link
          href="/setup-builder"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}
        >
          {editLabel}
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-muted-foreground rounded-2xl border border-dashed px-4 py-8 text-center text-sm">
          <p>{emptyLabel}</p>
          <Link
            href="/setup-builder"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}
          >
            {editLabel}
          </Link>
        </div>
      ) : (
        <ul className="divide-border/80 overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.35))]">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-3 border-b px-3 py-3 text-sm last:border-b-0"
            >
              <div className="bg-muted/80 flex size-12 shrink-0 items-center justify-center rounded-xl border px-1 sm:size-14">
                <ProductIllustration productId={product.id} className="h-9 w-full sm:h-10" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{product.name}</p>
                <p className="text-muted-foreground text-xs capitalize">{product.category}</p>
              </div>
              <span className="shrink-0 tabular-nums">{formatUsd(product.pricePerWeek)}/wk</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
