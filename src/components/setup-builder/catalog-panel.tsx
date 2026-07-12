"use client";

import { useTranslations } from "next-intl";

import { CatalogProductList } from "@/components/setup-builder/catalog-product-list";
import { CatalogRailActions } from "@/components/setup-builder/catalog-rail-actions";
import { MonitorCountPicker } from "@/components/setup-builder/monitor-count-picker";
import { PresetPicker } from "@/components/setup-builder/preset-picker";
import { SavedSetups } from "@/components/setup-builder/saved-setups";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listProductsByCategorySync } from "@/lib/catalog-api";
import { isDrawerProductId, useSetupBuilderStore } from "@/store/setup-builder-store";

export function CatalogPanel() {
  const t = useTranslations("SetupBuilder");

  return (
    <StoreReady className="flex h-full min-h-0 flex-col" label={t("loadingCatalog")}>
      <CatalogPanelContent />
    </StoreReady>
  );
}

function CatalogPanelContent() {
  const t = useTranslations("SetupBuilder");
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const setDeskId = useSetupBuilderStore((state) => state.setDeskId);
  const setChairId = useSetupBuilderStore((state) => state.setChairId);
  const toggleAccessory = useSetupBuilderStore((state) => state.toggleAccessory);

  const allAccessories = listProductsByCategorySync("accessory").filter(
    (product) => product.layer !== "monitor",
  );
  const deskAccessoryProducts = allAccessories.filter((product) => !isDrawerProductId(product.id));
  const drawerProducts = allAccessories.filter((product) => isDrawerProductId(product.id));
  const accessoriesDisabled = monitorCount >= 3;
  const tabTriggerClassName =
    "h-8 w-full min-w-0 flex-none justify-start truncate px-2.5 data-active:bg-background data-active:text-foreground data-active:shadow-sm";

  return (
    <section
      aria-label="Product catalog"
      className="flex h-full min-h-0 flex-col gap-2.5 overflow-hidden"
    >
      <div className="flex shrink-0 flex-col gap-2">
        <PresetPicker variant="rail" />
        <CatalogRailActions />
        <SavedSetups />
        <MonitorCountPicker />
      </div>

      <Tabs
        defaultValue="desk"
        orientation="vertical"
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden"
      >
        <TabsList
          variant="default"
          className="h-auto w-full min-w-0 shrink-0 grow-0 flex-col items-stretch justify-start gap-0.5 overflow-hidden p-1"
        >
          <TabsTrigger value="desk" className={tabTriggerClassName}>
            {t("tabs.desk")}
          </TabsTrigger>
          <TabsTrigger value="chair" className={tabTriggerClassName}>
            {t("tabs.chair")}
          </TabsTrigger>
          <TabsTrigger value="accessory" className={tabTriggerClassName}>
            {t("tabs.accessory")}
          </TabsTrigger>
          <TabsTrigger value="drawer" className={tabTriggerClassName}>
            {t("tabs.drawer")}
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="min-h-0 flex-1">
          <div className="pb-4">
            <TabsContent value="desk" className="mt-0">
              <CatalogProductList
                products={listProductsByCategorySync("desk")}
                isSelected={(product) => deskId === product.id}
                onSelect={(product) => setDeskId(product.id)}
              />
            </TabsContent>
            <TabsContent value="chair" className="mt-0">
              <CatalogProductList
                products={listProductsByCategorySync("chair")}
                isSelected={(product) => chairId === product.id}
                onSelect={(product) => setChairId(product.id)}
              />
            </TabsContent>
            <TabsContent value="accessory" className="mt-0 grid gap-3">
              {accessoriesDisabled ? (
                <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-2 text-xs leading-relaxed">
                  {t("accessoriesDisabledForTripleMonitors")}
                </p>
              ) : null}
              <CatalogProductList
                products={deskAccessoryProducts}
                isSelected={(product) => accessoryIds.includes(product.id)}
                isDisabled={() => accessoriesDisabled}
                disabledReason={() => t("accessoriesDisabledForTripleMonitors")}
                onSelect={(product) => toggleAccessory(product.id)}
              />
            </TabsContent>
            <TabsContent value="drawer" className="mt-0">
              <CatalogProductList
                products={drawerProducts}
                isSelected={(product) => accessoryIds.includes(product.id)}
                onSelect={(product) => toggleAccessory(product.id)}
              />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </section>
  );
}
