"use client";

import { useProductCopy } from "@/hooks/use-product-copy";
import type { CatalogProduct } from "@/types/catalog";

type Props = {
  products: CatalogProduct[];
};

function SelectedProductName({ productId }: { productId: string }) {
  const { name } = useProductCopy(productId);
  return <li>{name}</li>;
}

/** Screen-reader inventory of products currently on the stage. */
export function WorkspaceSelectedList({ products }: Props) {
  return (
    <ul className="sr-only">
      {products.map((product) => (
        <SelectedProductName key={product.id} productId={product.id} />
      ))}
    </ul>
  );
}
