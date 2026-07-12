import { catalog, getProductById, getProductsByCategory } from "@/data/catalog";
import type { CatalogProduct, ProductCategory } from "@/types/catalog";

/** Catalog access seam — swap implementation for REST/GraphQL later. */
export async function listProducts(): Promise<CatalogProduct[]> {
  return catalog;
}

export async function listProductsByCategory(category: ProductCategory): Promise<CatalogProduct[]> {
  return getProductsByCategory(category);
}

export async function getProduct(id: string): Promise<CatalogProduct | undefined> {
  return getProductById(id);
}

/** Sync helpers for client components and store logic that cannot await. */
export function listProductsSync() {
  return catalog;
}

export function listProductsByCategorySync(category: ProductCategory) {
  return getProductsByCategory(category);
}

export function getProductSync(id: string) {
  return getProductById(id);
}
