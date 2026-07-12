import { getTranslations, setRequestLocale } from "next-intl/server";

import { FeatureHighlights } from "@/components/home/feature-highlights";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

type Props = {
  params: Promise<{ locale: string }>;
};

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
