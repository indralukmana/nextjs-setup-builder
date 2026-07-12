import { describe, expect, it } from "vitest";

import { buildStageSlots } from "@/components/setup-builder/preview-layers";
import { getProductById } from "@/data/catalog";

describe("buildStageSlots", () => {
  it("orders desk, chair, and accessories into positioned slots", () => {
    const products = [
      getProductById("desk-electric")!,
      getProductById("chair-ergonomic")!,
      getProductById("monitor-24")!,
      getProductById("lamp-led")!,
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
