import type { CatalogProduct } from "@/types/catalog";

export const catalog: CatalogProduct[] = [
  {
    id: "desk-electric",
    name: "Electrical Adjustable Desk",
    category: "desk",
    pricePerWeek: 18,
    layer: "desk",
    description: "Electric sit-stand desk with quiet motor.",
  },
  {
    id: "desk-mechanical",
    name: "Mechanical Adjustable Desk",
    category: "desk",
    pricePerWeek: 12,
    layer: "desk",
    description: "Manual height-adjustable desk, no power needed.",
  },
  {
    id: "chair-ergonomic",
    name: "Ergonomic Office Chair",
    category: "chair",
    pricePerWeek: 14,
    layer: "chair",
    description: "Breathable mesh with 4D armrests and lumbar support.",
  },
  {
    id: "chair-task",
    name: "Compact Task Chair",
    category: "chair",
    pricePerWeek: 8,
    layer: "chair",
    description: "Lightweight task chair for smaller workspaces.",
  },
  {
    id: "monitor-24",
    name: '24" Full HD Monitor',
    category: "accessory",
    pricePerWeek: 6,
    layer: "monitor",
    description: "Fast IPS office monitor for everyday work.",
  },
  {
    id: "monitor-27-4k",
    name: '27" 4K Monitor',
    category: "accessory",
    pricePerWeek: 12,
    layer: "monitor",
    description: "USB-C 4K display with sharp color.",
  },
  {
    id: "monitor-34",
    name: '34" Ultrawide Monitor',
    category: "accessory",
    pricePerWeek: 16,
    layer: "monitor",
    description: "Curved ultrawide for immersive multitasking.",
  },
  {
    id: "lamp-led",
    name: "Smart LED Desk Lamp",
    category: "accessory",
    pricePerWeek: 3,
    layer: "lamp",
    description: "Adjustable color temperature desk lamp.",
  },
  {
    id: "plant-desk",
    name: "Desk Plant",
    category: "accessory",
    pricePerWeek: 2,
    layer: "plant",
    description: "Low-maintenance greenery for your setup.",
  },
  {
    id: "stand-laptop",
    name: "Ergonomic Laptop Stand",
    category: "accessory",
    pricePerWeek: 2,
    layer: "peripheral",
    description: "Raises laptops for a healthier posture.",
  },
  {
    id: "kit-peripherals",
    name: "Keyboard & Mouse Kit",
    category: "accessory",
    pricePerWeek: 4,
    layer: "peripheral",
    description: "Wireless keyboard and mouse pair.",
  },
];

export function getProductById(id: string) {
  return catalog.find((product) => product.id === id);
}

export function getProductsByCategory(category: CatalogProduct["category"]) {
  return catalog.filter((product) => product.category === category);
}
