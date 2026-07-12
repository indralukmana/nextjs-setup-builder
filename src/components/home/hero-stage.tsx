"use client";

import { motion } from "motion/react";

import { ProductIllustration, buildStageSlots } from "@/components/setup-builder/preview-layers";
import { getProductById } from "@/data/catalog";

const SHOWCASE_IDS = [
  "desk-electric",
  "chair-ergonomic",
  "monitor-27-4k",
  "lamp-led",
  "plant-desk",
] as const;

export function HeroStage() {
  const products = SHOWCASE_IDS.map((id) => getProductById(id)).filter(
    (product) => product != null,
  );
  const slots = buildStageSlots(products);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(165deg,#eaf3e4_0%,#f3ebe0_42%,#d9c9a8_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,245,0.75),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent,#b7a888)]" />
      <motion.div
        className="absolute top-[8%] right-[12%] size-40 rounded-full bg-[#a7d46a]/35 blur-3xl"
        animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[28%] left-[8%] size-28 rounded-full bg-[#fde68a]/40 blur-3xl"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <div className="absolute inset-0 origin-bottom scale-110 md:translate-x-[8%] md:scale-100 lg:translate-x-[14%]">
        {slots.map((slot, index) => (
          <motion.div
            key={slot.product.id}
            className={slot.className}
            style={{ zIndex: slot.zIndex }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.12 * index }}
          >
            <ProductIllustration
              productId={slot.product.id}
              className="h-auto w-full drop-shadow-[0_16px_32px_rgba(40,50,30,0.2)]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
