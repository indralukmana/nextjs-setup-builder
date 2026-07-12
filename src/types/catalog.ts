export type ProductCategory = "desk" | "chair" | "accessory";

export type PreviewLayer =
  | "desk"
  | "chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "peripheral"
  | "webcam"
  | "whiteboard"
  | "power";

export type CatalogProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  pricePerWeek: number;
  layer: PreviewLayer;
  description: string;
};
