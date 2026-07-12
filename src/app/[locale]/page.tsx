import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FeatureHighlights } from "@/components/home/feature-highlights";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: `/${locale}`,
      images: [{ url: "/og", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}`])),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div className="w-full">
      <HeroSection brand={t("brand")} title={t("title")} subtitle={t("subtitle")} cta={t("cta")} />
      <HowItWorks
        heading={t("howHeading")}
        steps={[
          {
            title: t("howSteps.desk.title"),
            description: t("howSteps.desk.description"),
          },
          {
            title: t("howSteps.gear.title"),
            description: t("howSteps.gear.description"),
          },
          {
            title: t("howSteps.rent.title"),
            description: t("howSteps.rent.description"),
          },
        ]}
      />
      <FeatureHighlights
        heading={t("featuresHeading")}
        items={[
          {
            title: t("features.preview.title"),
            description: t("features.preview.description"),
          },
          {
            title: t("features.weekly.title"),
            description: t("features.weekly.description"),
          },
          {
            title: t("features.delivery.title"),
            description: t("features.delivery.description"),
          },
        ]}
      />
    </div>
  );
}
