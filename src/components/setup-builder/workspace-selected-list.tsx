import type { CatalogProduct } from "@/types/catalog";

type Props = {
  products: CatalogProduct[];
};

/** Screen-reader inventory of products currently on the stage. */
export function WorkspaceSelectedList({ products }: Props) {
  return (
    <ul className="sr-only">
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
