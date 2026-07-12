import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CatalogJsonLd } from "@/components/seo/catalog-json-ld";
import { CatalogPanel } from "@/components/setup-builder/catalog-panel";
import { SetupUrlSync } from "@/components/setup-builder/setup-url-sync";
import { SummaryBar } from "@/components/setup-builder/summary-bar";
import { SetupScenePreview } from "@/components/setup-scene/setup-scene-preview";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("setupBuilderTitle"),
    description: t("setupBuilderDescription"),
    openGraph: {
      title: t("setupBuilderTitle"),
      description: t("setupBuilderDescription"),
      url: `/${locale}/setup-builder`,
      images: [{ url: "/og", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/${locale}/setup-builder`,
      languages: Object.fromEntries(
        routing.locales.map((item) => [item, `/${item}/setup-builder`]),
      ),
    },
  };
}

export default async function SetupBuilderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SetupBuilder");

  return (
    <>
      <CatalogJsonLd />
      <Suspense fallback={null}>
        <SetupUrlSync />
      </Suspense>
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <Link
              href="/setup-scene"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
            >
              {t("setupSceneLink")}
            </Link>
          </div>
          <SetupScenePreview />
        </div>
        <CatalogPanel />
      </div>
      <SummaryBar />
    </>
  );
}
