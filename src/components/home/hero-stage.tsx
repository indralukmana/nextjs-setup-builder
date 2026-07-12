"use client";

import { motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Atmospheric full-bleed backdrop for the home hero (no SVG product stage). */
export function HeroStage() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(165deg,#eaf3e4_0%,#f3ebe0_42%,#d9c9a8_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,245,0.75),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent,#b7a888)]" />
      <motion.div
        className="motion-safe-blur absolute top-[8%] right-[12%] size-40 rounded-full bg-[#a7d46a]/35 blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="motion-safe-blur absolute top-[28%] left-[8%] size-28 rounded-full bg-[#fde68a]/40 blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }
      />
      <motion.div
        className="absolute right-[-8%] bottom-[18%] h-[42%] w-[58%] rounded-[40%_60%_45%_55%] bg-[#c4b08a]/35 blur-2xl md:right-[4%] md:w-[42%]"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
