"use client";

import { useTranslations } from "next-intl";

import { ProductCategoryIcon } from "@/components/setup-builder/product-category-icon";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useProductCopy } from "@/hooks/use-product-copy";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  product: CatalogProduct;
  quantity?: number;
};

export function SetupSummaryItem({ product, quantity = 1 }: Props) {
  const t = useTranslations("Checkout");
  const formatMoney = useFormatMoney();
  const { name } = useProductCopy(product.id);
  const linePrice = product.pricePerWeek * quantity;

  return (
    <li className="flex items-center gap-3 border-b px-3 py-2.5 text-sm last:border-b-0">
      <div className="bg-muted/60 flex size-10 shrink-0 items-center justify-center rounded-lg border">
        <ProductCategoryIcon product={product} className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium leading-snug">
          {name}
          {quantity > 1 ? ` ×${quantity}` : ""}
        </p>
      </div>
      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
        {t("pricePerWeek", { amount: formatMoney(linePrice) })}
      </span>
    </li>
  );
}
