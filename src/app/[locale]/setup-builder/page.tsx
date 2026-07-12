import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CatalogJsonLd } from "@/components/seo/catalog-json-ld";
import { BuilderViewport } from "@/components/setup-builder/builder-viewport";
import { SetupBuilderWorkspace } from "@/components/setup-builder/setup-builder-workspace";
import { SetupUrlSync } from "@/components/setup-builder/setup-url-sync";
import { routing } from "@/i18n/routing";

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
      <BuilderViewport>
        <SetupBuilderWorkspace title={t("title")} />
      </BuilderViewport>
    </>
  );
}
