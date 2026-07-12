import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SetupUrlSync } from "@/components/setup-builder/setup-url-sync";
import { SetupSceneShell } from "@/components/setup-scene/setup-scene-shell";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("setupSceneTitle"),
    description: t("setupSceneDescription"),
    openGraph: {
      title: t("setupSceneTitle"),
      description: t("setupSceneDescription"),
      url: `/${locale}/setup-scene`,
      images: [{ url: "/og", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/${locale}/setup-scene`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}/setup-scene`])),
    },
  };
}

export default async function SetupScenePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <SetupUrlSync />
      </Suspense>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8">
        <SetupSceneShell />
      </div>
    </>
  );
}
