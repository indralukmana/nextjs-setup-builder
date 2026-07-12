"use client";

import { useTranslations } from "next-intl";

import { CatalogProductList } from "@/components/setup-builder/catalog-product-list";
import { CopySetupLink } from "@/components/setup-builder/copy-setup-link";
import { MonitorLimitNotice } from "@/components/setup-builder/monitor-limit-notice";
import { PresetPicker } from "@/components/setup-builder/preset-picker";
import { ResetSetupButton } from "@/components/setup-builder/reset-setup-button";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listProductsByCategorySync } from "@/lib/catalog-api";
import { countMonitors, MAX_MONITORS, useSetupBuilderStore } from "@/store/setup-builder-store";

export function CatalogPanel() {
  const t = useTranslations("SetupBuilder");

  return (
    <StoreReady className="min-h-80" label={t("loadingCatalog")}>
      <CatalogPanelContent />
    </StoreReady>
  );
}

function CatalogPanelContent() {
  const t = useTranslations("SetupBuilder");
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const setDeskId = useSetupBuilderStore((state) => state.setDeskId);
  const setChairId = useSetupBuilderStore((state) => state.setChairId);
  const toggleAccessory = useSetupBuilderStore((state) => state.toggleAccessory);
  const monitorsFull = countMonitors(accessoryIds) >= MAX_MONITORS;

  return (
    <section aria-label="Product catalog" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <PresetPicker />
        <div className="flex flex-wrap gap-2">
          <ResetSetupButton />
          <CopySetupLink />
        </div>
      </div>
      <Tabs defaultValue="desk">
        <TabsList className="h-auto w-full max-w-full flex-wrap sm:w-fit">
          <TabsTrigger value="desk" className="px-2.5 sm:px-3">
            {t("tabs.desk")}
          </TabsTrigger>
          <TabsTrigger value="chair" className="px-2.5 sm:px-3">
            {t("tabs.chair")}
          </TabsTrigger>
          <TabsTrigger value="accessory" className="px-2.5 sm:px-3">
            {t("tabs.accessory")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="desk" className="mt-4">
          <CatalogProductList
            products={listProductsByCategorySync("desk")}
            isSelected={(product) => deskId === product.id}
            onSelect={(product) => setDeskId(product.id)}
          />
        </TabsContent>
        <TabsContent value="chair" className="mt-4">
          <CatalogProductList
            products={listProductsByCategorySync("chair")}
            isSelected={(product) => chairId === product.id}
            onSelect={(product) => setChairId(product.id)}
          />
        </TabsContent>
        <TabsContent value="accessory" className="mt-4 grid gap-3">
          {monitorsFull ? (
            <MonitorLimitNotice message={t("monitorLimit", { max: MAX_MONITORS })} />
          ) : null}
          <CatalogProductList
            products={listProductsByCategorySync("accessory")}
            isSelected={(product) => accessoryIds.includes(product.id)}
            isDisabled={(product) =>
              product.layer === "monitor" && !accessoryIds.includes(product.id) && monitorsFull
            }
            disabledReason={() => t("monitorLimitShort", { max: MAX_MONITORS })}
            onSelect={(product) => toggleAccessory(product.id)}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
