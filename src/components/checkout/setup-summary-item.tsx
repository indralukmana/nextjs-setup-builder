"use client";

import { useLocale } from "next-intl";

import { ProductCategoryIcon } from "@/components/setup-builder/product-category-icon";
import { useProductCopy } from "@/hooks/use-product-copy";
import { formatMoney } from "@/lib/pricing";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  product: CatalogProduct;
  quantity?: number;
};

export function SetupSummaryItem({ product, quantity = 1 }: Props) {
  const locale = useLocale();
  const { name } = useProductCopy(product.id);
  const linePrice = product.pricePerWeek * quantity;

  return (
    <li className="flex items-center gap-3 border-b px-3 py-3 text-sm last:border-b-0">
      <div className="bg-muted/80 flex size-12 shrink-0 items-center justify-center rounded-xl border sm:size-14">
        <ProductCategoryIcon product={product} className="size-6 sm:size-7" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {name}
          {quantity > 1 ? ` ×${quantity}` : ""}
        </p>
        <p className="text-muted-foreground text-xs capitalize">{product.category}</p>
      </div>
      <span className="shrink-0 tabular-nums">{formatMoney(linePrice, locale)}/wk</span>
    </li>
  );
}
