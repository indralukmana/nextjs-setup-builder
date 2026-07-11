"use client";

import { ProductIllustration } from "@/components/setup-builder/preview-layers";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUsd } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  product: CatalogProduct;
  selected: boolean;
  onSelect: () => void;
};

export function ProductCard({ product, selected, onSelect }: Props) {
  return (
    <button type="button" onClick={onSelect} className="text-left" aria-pressed={selected}>
      <span className="sr-only">
        {selected ? "Selected" : "Select"} {product.name}
      </span>
      <Card
        className={cn(
          "overflow-hidden transition-colors",
          selected && "border-foreground ring-foreground/20 ring-2",
        )}
        aria-hidden
      >
        <div className="flex items-stretch gap-3 p-3">
          <div className="bg-muted/70 flex size-20 shrink-0 items-center justify-center rounded-lg border px-1">
            <ProductIllustration productId={product.id} className="h-16 w-full" />
          </div>
          <CardHeader className="gap-2 p-0">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
              <Badge variant="secondary">{formatUsd(product.pricePerWeek)}/wk</Badge>
            </div>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
        </div>
      </Card>
    </button>
  );
}
