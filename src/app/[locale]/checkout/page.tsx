import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CheckoutContent } from "@/components/checkout/checkout-content";
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

  return <CheckoutContent />;
}
