"use client";

import { ProductCard } from "@/components/setup-builder/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductsByCategory } from "@/data/catalog";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function CatalogPanel() {
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const setDeskId = useSetupBuilderStore((state) => state.setDeskId);
  const setChairId = useSetupBuilderStore((state) => state.setChairId);
  const toggleAccessory = useSetupBuilderStore((state) => state.toggleAccessory);

  return (
    <section aria-label="Product catalog" className="flex flex-col gap-4">
      <Tabs defaultValue="desk">
        <TabsList>
          <TabsTrigger value="desk">Desks</TabsTrigger>
          <TabsTrigger value="chair">Chairs</TabsTrigger>
          <TabsTrigger value="accessory">Accessories</TabsTrigger>
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
          {getProductsByCategory("accessory").map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={accessoryIds.includes(product.id)}
              onSelect={() => toggleAccessory(product.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}
