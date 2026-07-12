"use client";

import { HeroCopy } from "@/components/home/hero-copy";
import { HeroStage } from "@/components/home/hero-stage";

type Props = {
  brand: string;
  title: string;
  subtitle: string;
  cta: string;
};

export function HeroSection({ brand, title, subtitle, cta }: Props) {
  return (
    <section className="relative isolate min-h-[min(92vh,52rem)] overflow-hidden">
      <HeroStage />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,250,244,0.92)_0%,rgba(247,250,244,0.72)_38%,rgba(247,250,244,0.18)_68%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(247,250,244,0.95)_0%,rgba(247,250,244,0.78)_32%,rgba(247,250,244,0.2)_58%,transparent_78%)]" />

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,52rem)] w-full max-w-6xl flex-col justify-end px-6 pt-24 pb-16 md:justify-center md:pb-24">
        <HeroCopy brand={brand} title={title} subtitle={subtitle} cta={cta} />
      </div>
    </section>
  );
}
