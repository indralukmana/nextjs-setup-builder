"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ reset }: Props) {
  const t = useTranslations("Error");

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
      <Button type="button" onClick={() => reset()}>
        {t("cta")}
      </Button>
    </main>
  );
}
