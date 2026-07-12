import { getTranslations, setRequestLocale } from "next-intl/server";

import { CatalogPanel } from "@/components/setup-builder/catalog-panel";
import { SummaryBar } from "@/components/setup-builder/summary-bar";
import { WorkspacePreview } from "@/components/setup-builder/workspace-preview";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SetupBuilderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SetupBuilder");

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl tracking-tight md:text-4xl">{t("title")}</h1>
          <WorkspacePreview />
        </div>
        <CatalogPanel />
      </div>
      <SummaryBar />
    </>
  );
}
