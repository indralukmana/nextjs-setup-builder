import { getTranslations, setRequestLocale } from "next-intl/server";

import { RentalForm } from "@/components/checkout/rental-form";
import { SetupSummary } from "@/components/checkout/setup-summary";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-14">
      <div className="max-w-xl">
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-2 text-sm text-pretty md:text-base">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <SetupSummary
          heading={t("summaryHeading")}
          editLabel={t("editSetup")}
          weeklyLabel={t("weeklyLabel")}
          emptyLabel={t("emptySummary")}
        />
        <RentalForm />
      </div>
    </div>
  );
}
