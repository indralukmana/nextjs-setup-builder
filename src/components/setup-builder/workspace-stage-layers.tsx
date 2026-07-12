"use client";

import { AnimatePresence, motion } from "motion/react";

import { ProductIllustration } from "@/components/setup-builder/preview-layers";
import type { StageSlot } from "@/components/setup-builder/preview-layers";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  slots: StageSlot[];
};

export function WorkspaceStageLayers({ slots }: Props) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="popLayout">
        {slots.map((slot) => (
          <motion.div
            key={slot.product.id}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.96 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }
            }
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
  );
}
