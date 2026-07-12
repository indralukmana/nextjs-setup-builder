import { describe, expect, it } from "vitest";

import { buildStageSlots } from "@/components/setup-builder/preview-layers";
import { getProductSync } from "@/lib/catalog-api";

describe("buildStageSlots", () => {
  it("orders desk, chair, and accessories into positioned slots", () => {
    const products = [
      getProductSync("desk-electric")!,
      getProductSync("chair-ergonomic")!,
      getProductSync("monitor-24")!,
      getProductSync("lamp-led")!,
    ];

    const slots = buildStageSlots(products);

    expect(slots.map((slot) => slot.product.id)).toEqual([
      "desk-electric",
      "chair-ergonomic",
      "monitor-24",
      "lamp-led",
    ]);
    expect(slots[0]?.zIndex).toBeLessThan(slots[1]!.zIndex);
  });
});
