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
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <SetupSummary />
      <RentalForm />
    </div>
  );
}
