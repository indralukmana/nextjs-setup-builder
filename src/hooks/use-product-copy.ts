"use client";

import { useTranslations } from "next-intl";

export function useProductCopy(productId: string) {
  const t = useTranslations("Catalog.products");
  return {
    name: t(`${productId}.name`),
    description: t(`${productId}.description`),
  };
}
