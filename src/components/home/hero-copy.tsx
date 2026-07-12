"use client";

import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  brand: string;
  title: string;
  subtitle: string;
  cta: string;
};

export function HeroCopy({ brand, title, subtitle, cta }: Props) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="flex max-w-xl flex-col gap-5"
      initial={reduceMotion ? false : { y: 16 }}
      animate={{ y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 220, damping: 28, delay: 0.05 }
      }
    >
      <p className="font-heading text-5xl leading-none tracking-tight text-[#1f3d2f] sm:text-6xl md:text-7xl">
        {brand}
      </p>
      <h1 className="font-heading max-w-lg text-2xl leading-snug font-medium tracking-tight text-balance text-[#2a4636] sm:text-3xl">
        {title}
      </h1>
      <p className="text-foreground/80 max-w-md text-base text-pretty sm:text-lg">{subtitle}</p>
      <div>
        <Link
          href="/setup-builder"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 px-5 text-base shadow-[0_10px_30px_rgba(40,70,45,0.18)]",
          )}
        >
          {cta}
        </Link>
      </div>
    </motion.div>
  );
}
