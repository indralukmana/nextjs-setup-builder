import type { CatalogProduct } from "@/types/catalog";

import { ProductCard } from "@/components/setup-builder/product-card";

type Props = {
  products: CatalogProduct[];
  isSelected: (product: CatalogProduct) => boolean;
  isDisabled?: (product: CatalogProduct) => boolean;
  disabledReason?: (product: CatalogProduct) => string | undefined;
  onSelect: (product: CatalogProduct) => void;
};

export function CatalogProductList({
  products,
  isSelected,
  isDisabled,
  disabledReason,
  onSelect,
}: Props) {
  return (
    <div className="grid gap-2">
      {products.map((product) => {
        const disabled = isDisabled?.(product) ?? false;
        return (
          <ProductCard
            key={product.id}
            product={product}
            selected={isSelected(product)}
            disabled={disabled}
            disabledReason={disabled ? disabledReason?.(product) : undefined}
            onSelect={() => onSelect(product)}
          />
        );
      })}
    </div>
  );
}
