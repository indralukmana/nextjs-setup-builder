import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-muted-foreground text-sm">{t("description")}</p>
      <Link href="/" className={cn(buttonVariants())}>
        {t("cta")}
      </Link>
    </main>
  );
}
