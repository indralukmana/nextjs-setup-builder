"use client";

import { ProductIllustration } from "@/components/setup-builder/preview-layers";
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
};

export function SetupSummary({ heading, editLabel, weeklyLabel }: Props) {
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
            {weeklyLabel} {formatUsd(weeklyTotal)}
          </p>
        </div>
        <Link
          href="/setup-builder"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}
        >
          {editLabel}
        </Link>
      </div>

      <ul className="divide-border/80 overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.35))]">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-3 border-b px-3 py-3 text-sm last:border-b-0"
          >
            <div className="bg-muted/80 flex size-14 shrink-0 items-center justify-center rounded-xl border px-1">
              <ProductIllustration productId={product.id} className="h-10 w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{product.name}</p>
              <p className="text-muted-foreground text-xs capitalize">{product.category}</p>
            </div>
            <span className="shrink-0 tabular-nums">{formatUsd(product.pricePerWeek)}/wk</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
