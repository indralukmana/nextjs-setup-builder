import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CatalogJsonLd } from "@/components/seo/catalog-json-ld";
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

/** Header is ~3.75rem (py-3 + nav row); shell fills the rest of the viewport. */
const BUILDER_SHELL =
  "flex h-[calc(100dvh-3.75rem)] min-h-0 w-full flex-1 flex-col overflow-hidden";

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
      <div className={BUILDER_SHELL}>
        <SetupBuilderWorkspace title={t("title")} setupSceneLabel={t("setupSceneLink")} />
      </div>
    </>
  );
}
