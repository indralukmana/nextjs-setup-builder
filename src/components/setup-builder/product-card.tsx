"use client";

import { useLocale, useTranslations } from "next-intl";

import { ProductIllustration } from "@/components/setup-builder/preview-layers";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductCopy } from "@/hooks/use-product-copy";
import { formatMoney } from "@/lib/pricing";
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
  const locale = useLocale();
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
          "overflow-hidden transition-colors",
          selected && "border-foreground ring-foreground/20 ring-2",
          disabled && "opacity-50",
        )}
        aria-hidden
      >
        <div className="flex items-stretch gap-3 p-3">
          <div className="bg-muted/70 flex size-16 shrink-0 items-center justify-center rounded-lg border px-1 sm:size-20">
            <ProductIllustration productId={product.id} className="h-12 w-full sm:h-16" />
          </div>
          <CardHeader className="min-w-0 gap-2 p-0">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-sm leading-snug sm:text-base">{name}</CardTitle>
              <Badge variant="secondary" className="shrink-0">
                {formatMoney(product.pricePerWeek, locale)}/wk
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 sm:line-clamp-none">
              {description}
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </button>
  );
}
