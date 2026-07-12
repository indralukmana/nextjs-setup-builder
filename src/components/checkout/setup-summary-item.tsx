import { ProductIllustration } from "@/components/setup-builder/preview-layers";
import { formatUsd } from "@/lib/pricing";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  product: CatalogProduct;
};

export function SetupSummaryItem({ product }: Props) {
  return (
    <li className="flex items-center gap-3 border-b px-3 py-3 text-sm last:border-b-0">
      <div className="bg-muted/80 flex size-12 shrink-0 items-center justify-center rounded-xl border px-1 sm:size-14">
        <ProductIllustration productId={product.id} className="h-9 w-full sm:h-10" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{product.name}</p>
        <p className="text-muted-foreground text-xs capitalize">{product.category}</p>
      </div>
      <span className="shrink-0 tabular-nums">{formatUsd(product.pricePerWeek)}/wk</span>
    </li>
  );
}
