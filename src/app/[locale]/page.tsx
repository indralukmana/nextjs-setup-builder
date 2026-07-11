import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-sm font-medium tracking-wide uppercase">monis</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance">{t("title")}</h1>
      <Button render={<Link href="/setup-builder" />}>{t("cta")}</Button>
    </main>
  );
}
