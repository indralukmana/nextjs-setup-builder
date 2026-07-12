import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
    alternates: {
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
