import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Cable,
  LampDesk,
  Laptop,
  Leaf,
  Monitor,
  Package,
  Presentation,
  Table2,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { CatalogProduct, PreviewLayer } from "@/types/catalog";

const LAYER_ICONS: Record<PreviewLayer, LucideIcon> = {
  desk: Table2,
  chair: Armchair,
  monitor: Monitor,
  lamp: LampDesk,
  plant: Leaf,
  peripheral: Laptop,
  webcam: Video,
  whiteboard: Presentation,
  power: Cable,
};

type ProductCategoryIconProps = {
  product: CatalogProduct;
  className?: string;
};

export function ProductCategoryIcon({ product, className }: ProductCategoryIconProps) {
  const Icon = LAYER_ICONS[product.layer] ?? Package;

  return <Icon aria-hidden className={cn("text-muted-foreground size-6", className)} />;
}
