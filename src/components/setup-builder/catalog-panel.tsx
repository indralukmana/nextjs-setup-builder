"use client";

import { useTranslations } from "next-intl";

import { ProductCard } from "@/components/setup-builder/product-card";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductsByCategory } from "@/data/catalog";
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
  const monitorCount = countMonitors(accessoryIds);
  const monitorsFull = monitorCount >= MAX_MONITORS;

  return (
    <section aria-label="Product catalog" className="flex flex-col gap-4">
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
        <TabsContent value="desk" className="mt-4 grid gap-3">
          {getProductsByCategory("desk").map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={deskId === product.id}
              onSelect={() => setDeskId(product.id)}
            />
          ))}
        </TabsContent>
        <TabsContent value="chair" className="mt-4 grid gap-3">
          {getProductsByCategory("chair").map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={chairId === product.id}
              onSelect={() => setChairId(product.id)}
            />
          ))}
        </TabsContent>
        <TabsContent value="accessory" className="mt-4 grid gap-3">
          {monitorsFull ? (
            <output className="text-muted-foreground rounded-xl border border-dashed px-3 py-2 text-xs leading-relaxed">
              {t("monitorLimit", { max: MAX_MONITORS })}
            </output>
          ) : null}
          {getProductsByCategory("accessory").map((product) => {
            const selected = accessoryIds.includes(product.id);
            const disabled = product.layer === "monitor" && !selected && monitorsFull;

            return (
              <ProductCard
                key={product.id}
                product={product}
                selected={selected}
                disabled={disabled}
                disabledReason={
                  disabled ? t("monitorLimitShort", { max: MAX_MONITORS }) : undefined
                }
                onSelect={() => toggleAccessory(product.id)}
              />
            );
          })}
        </TabsContent>
      </Tabs>
    </section>
  );
}
