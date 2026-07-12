import type { CatalogProduct } from "@/types/catalog";

export type StageSlot = {
  product: CatalogProduct;
  className: string;
  zIndex: number;
};

/** Position products into a composed side-view workspace stage. */
export function buildStageSlots(products: CatalogProduct[]): StageSlot[] {
  const desk = products.find((p) => p.layer === "desk");
  const chair = products.find((p) => p.layer === "chair");
  const monitors = products.filter((p) => p.layer === "monitor");
  const lamp = products.find((p) => p.layer === "lamp");
  const plant = products.find((p) => p.layer === "plant");
  const webcam = products.find((p) => p.layer === "webcam");
  const whiteboard = products.find((p) => p.layer === "whiteboard");
  const power = products.find((p) => p.layer === "power");
  const peripherals = products.filter((p) => p.layer === "peripheral");

  const slots: StageSlot[] = [];

  if (desk) {
    slots.push({
      product: desk,
      zIndex: 10,
      className: "absolute bottom-[12%] left-[18%] w-[64%] max-w-[420px]",
    });
  }

  if (chair) {
    slots.push({
      product: chair,
      zIndex: 20,
      className: "absolute bottom-[6%] left-[2%] w-[22%] max-w-[150px]",
    });
  }

  monitors.forEach((monitor, index) => {
    slots.push({
      product: monitor,
      zIndex: 30 + index,
      className:
        monitor.id === "monitor-34"
          ? "absolute bottom-[38%] left-[28%] w-[44%] max-w-[280px]"
          : `absolute bottom-[40%] w-[24%] max-w-[160px] ${
              index === 0 && monitors.length > 1
                ? "left-[30%]"
                : monitors.length === 1
                  ? "left-[38%]"
                  : "left-[48%]"
            }`,
    });
  });

  if (lamp) {
    slots.push({
      product: lamp,
      zIndex: 35,
      className: "absolute bottom-[34%] right-[16%] w-[12%] max-w-[90px]",
    });
  }

  if (plant) {
    slots.push({
      product: plant,
      zIndex: 34,
      className: "absolute bottom-[30%] right-[6%] w-[12%] max-w-[90px]",
    });
  }

  if (webcam) {
    slots.push({
      product: webcam,
      zIndex: 45,
      className: "absolute bottom-[52%] left-[42%] w-[8%] max-w-[60px]",
    });
  }

  if (whiteboard) {
    slots.push({
      product: whiteboard,
      zIndex: 25,
      className: "absolute bottom-[42%] right-[4%] w-[16%] max-w-[120px]",
    });
  }

  if (power) {
    slots.push({
      product: power,
      zIndex: 38,
      className: "absolute bottom-[22%] left-[24%] w-[18%] max-w-[140px]",
    });
  }

  peripherals.forEach((item, index) => {
    slots.push({
      product: item,
      zIndex: 40 + index,
      className:
        item.id === "stand-laptop"
          ? "absolute bottom-[34%] left-[22%] w-[16%] max-w-[120px]"
          : "absolute bottom-[28%] left-[42%] w-[20%] max-w-[150px]",
    });
  });

  return slots;
}
