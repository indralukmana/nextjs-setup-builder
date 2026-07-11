"use client";

import { getProductById } from "@/data/catalog";
import { formatUsd } from "@/lib/pricing";
import { selectSelectedIds, useSetupBuilderStore } from "@/store/setup-builder-store";

export function SetupSummary() {
  const selectedIds = useSetupBuilderStore(selectSelectedIds);
  const products = selectedIds.map((id) => getProductById(id)).filter((product) => product != null);

  return (
    <section aria-label="Setup summary" className="flex flex-col gap-3">
      <ul className="divide-border divide-y rounded-xl border">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-muted-foreground text-xs capitalize">{product.category}</p>
            </div>
            <span>{formatUsd(product.pricePerWeek)}/wk</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
