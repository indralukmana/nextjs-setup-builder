"use client";

import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProductCategoryIcon } from "@/components/setup-builder/product-category-icon";
import { Card } from "@/components/ui/card";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useProductCopy } from "@/hooks/use-product-copy";
import { cn } from "@/lib/utils";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  product: CatalogProduct;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  disabledReason?: string;
};

export function ProductCard({
  product,
  selected,
  onSelect,
  disabled = false,
  disabledReason,
}: Props) {
  const t = useTranslations("Catalog");
  const formatMoney = useFormatMoney();
  const { name, description } = useProductCopy(product.id);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className="text-left disabled:cursor-not-allowed"
      aria-pressed={selected}
      aria-disabled={disabled}
      title={disabled ? disabledReason : undefined}
    >
      <span className="sr-only">
        {disabled
          ? `${name}. ${disabledReason ?? t("unavailable")}`
          : `${selected ? t("selected") : t("select")} ${name}`}
      </span>
      <Card
        className={cn(
          "gap-0 py-0 ring-0 transition-colors",
          selected ? "bg-secondary" : "bg-card",
          disabled && "opacity-50",
        )}
        aria-hidden
      >
        <div className="flex items-start gap-3 p-3">
          <div className="bg-muted/70 flex size-11 shrink-0 items-center justify-center rounded-lg border">
            <ProductCategoryIcon product={product} className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-snug">{name}</p>
            <p className="text-muted-foreground mt-0.5 text-xs tabular-nums">
              {formatMoney(product.pricePerWeek)}/wk
            </p>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
              {description}
            </p>
          </div>
          <CheckIcon
            className={cn(
              "mt-0.5 size-4 shrink-0 transition-opacity",
              selected ? "text-foreground opacity-100" : "opacity-0",
            )}
          />
        </div>
      </Card>
    </button>
  );
}
