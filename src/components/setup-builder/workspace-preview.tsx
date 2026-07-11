"use client";

import { AnimatePresence, motion } from "motion/react";

import { ProductIllustration, buildStageSlots } from "@/components/setup-builder/preview-layers";
import { getProductById } from "@/data/catalog";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function WorkspacePreview() {
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const products = selectedIds.map((id) => getProductById(id)).filter((product) => product != null);
  const slots = buildStageSlots(products);

  return (
    <section
      aria-label="Workspace preview"
      className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-[#d6c4a8]/80 bg-[linear-gradient(180deg,#f7efe2_0%,#e8d7c0_48%,#d7c3a6_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] md:min-h-[28rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,252,245,0.85),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,transparent,#c4b193)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] right-[10%] h-24 w-24 rounded-full bg-[#fde68a]/50 blur-2xl"
      />

      <p className="text-foreground/70 absolute top-4 left-4 z-50 text-xs font-medium tracking-[0.18em] uppercase">
        Live setup
      </p>

      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          {slots.map((slot) => (
            <motion.div
              key={slot.product.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={slot.className}
              style={{ zIndex: slot.zIndex }}
            >
              <ProductIllustration
                productId={slot.product.id}
                className="h-auto w-full drop-shadow-[0_12px_24px_rgba(55,40,20,0.18)]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ul className="sr-only">
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
