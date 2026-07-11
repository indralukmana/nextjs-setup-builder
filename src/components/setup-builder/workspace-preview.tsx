"use client";

import { motion } from "motion/react";

import { getProductById } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function WorkspacePreview() {
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const products = selectedIds.map((id) => getProductById(id)).filter((product) => product != null);

  return (
    <section
      aria-label="Workspace preview"
      className="border-border bg-muted/40 relative min-h-80 overflow-hidden rounded-xl border"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_55%)]" />
      <ul className="relative flex h-full flex-col justify-end gap-2 p-6">
        {products.map((product, index) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-md border bg-white/90 px-3 py-2 text-sm shadow-sm backdrop-blur",
              product.layer === "desk" && "font-medium",
            )}
            style={{ marginLeft: `${Math.min(index, 4) * 8}px` }}
          >
            <span className="text-muted-foreground mr-2 text-xs uppercase">{product.layer}</span>
            {product.name}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
