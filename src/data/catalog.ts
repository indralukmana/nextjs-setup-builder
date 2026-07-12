import type { CatalogProduct } from "@/types/catalog";

export const MONITOR_PRODUCT_ID = "monitor-gaming";

export const catalog: CatalogProduct[] = [
  {
    id: "desk-bollsidan",
    name: "BOLLSIDAN sit/stand desk",
    category: "desk",
    pricePerWeek: 18,
    layer: "desk",
    description: "Electric white sit-stand desk for flexible work height.",
  },
  {
    id: "desk-mittzon",
    name: "MITTZON sit/stand desk",
    category: "desk",
    pricePerWeek: 22,
    layer: "desk",
    description:
      "Premium electric sit-stand desk with walnut veneer, black underframe, and extra work surface features.",
  },
  {
    id: "desk-utespelare",
    name: "UTESPELARE gaming desk",
    category: "desk",
    pricePerWeek: 26,
    layer: "desk",
    description: "Flagship black gaming desk sized for multi-monitor setups and peripherals.",
  },
  {
    id: "chair-alefjall",
    name: "ALEFJÄLL office chair",
    category: "chair",
    pricePerWeek: 14,
    layer: "chair",
    description: "Glose black leather office chair with full adjustability.",
  },
  {
    id: "chair-gronfjall",
    name: "GRÖNFJÄLL office chair",
    category: "chair",
    pricePerWeek: 14,
    layer: "chair",
    description: "Gray-green office chair with armrests.",
  },
  {
    id: "chair-gronfjall-headrest",
    name: "GRÖNFJÄLL office chair with headrest",
    category: "chair",
    pricePerWeek: 15,
    layer: "chair",
    description: "Gray/black office chair with armrests and headrest.",
  },
  {
    id: MONITOR_PRODUCT_ID,
    name: "Gaming monitor",
    category: "accessory",
    pricePerWeek: 10,
    layer: "monitor",
    description: "High-refresh gaming display for focused work or play.",
  },
  {
    id: "lamp-nymane",
    name: "NYMÅNE work lamp",
    category: "accessory",
    pricePerWeek: 4,
    layer: "lamp",
    description: "White work lamp with wireless charging base.",
  },
  {
    id: "lamp-svallet",
    name: "SVALLET work lamp",
    category: "accessory",
    pricePerWeek: 3,
    layer: "lamp",
    description: "Compact dark gray/white task lamp.",
  },
  {
    id: "stand-lanespelare",
    name: "LÅNESPELARE accessories stand",
    category: "accessory",
    pricePerWeek: 4,
    layer: "peripheral",
    description: "Gaming accessories stand for headset, cups, and small gear.",
  },
  {
    id: "drawer-alex",
    name: "ALEX drawer unit",
    category: "accessory",
    pricePerWeek: 5,
    layer: "peripheral",
    description: "Black-brown drawer unit that tucks beside the desk.",
  },
];

export function getProductById(id: string) {
  return catalog.find((product) => product.id === id);
}

export function getProductsByCategory(category: CatalogProduct["category"]) {
  return catalog.filter((product) => product.category === category);
}
