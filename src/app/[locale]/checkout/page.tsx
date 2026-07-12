import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { RentalForm } from "@/components/checkout/rental-form";
import { SetupSummary } from "@/components/checkout/setup-summary";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("checkoutTitle"),
    description: t("checkoutDescription"),
    openGraph: {
      title: t("checkoutTitle"),
      description: t("checkoutDescription"),
      url: `/${locale}/checkout`,
      images: [{ url: "/og", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/${locale}/checkout`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}/checkout`])),
    },
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-10">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-2 text-sm text-pretty md:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="order-2 lg:order-1">
          <RentalForm />
        </div>
        <div className="order-1 lg:sticky lg:top-20 lg:order-2">
          <SetupSummary
            heading={t("summaryHeading")}
            editLabel={t("editSetup")}
            weeklyLabel={t("weeklyLabel")}
            emptyLabel={t("emptySummary")}
            deliveryTitle={t("delivery.title")}
            deliveryBody={t("delivery.body")}
          />
        </div>
      </div>
    </div>
  );
}
