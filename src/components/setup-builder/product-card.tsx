"use client";

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
          "transition-colors",
          selected && "border-foreground ring-foreground/20 ring-2",
        )}
        aria-hidden
      >
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base">{product.name}</CardTitle>
            <Badge variant="secondary">{formatUsd(product.pricePerWeek)}/wk</Badge>
          </div>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
      </Card>
    </button>
  );
}
