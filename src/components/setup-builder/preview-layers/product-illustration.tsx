import type { CSSProperties, ReactNode } from "react";

import {
  LaptopStand,
  LampLed,
  PeripheralsKit,
  PlantDesk,
  PowerStrip,
  WebcamHd,
  WhiteboardGlass,
} from "@/components/setup-builder/preview-layers/accessories";
import { ChairErgonomic, ChairTask } from "@/components/setup-builder/preview-layers/chairs";
import { DeskElectric, DeskMechanical } from "@/components/setup-builder/preview-layers/desks";
import {
  Monitor24,
  Monitor27,
  Monitor34,
} from "@/components/setup-builder/preview-layers/monitors";
import type { LayerProps } from "@/components/setup-builder/preview-layers/types";

const layerComponents: Record<string, (props: LayerProps) => ReactNode> = {
  "desk-electric": DeskElectric,
  "desk-mechanical": DeskMechanical,
  "chair-ergonomic": ChairErgonomic,
  "chair-task": ChairTask,
  "monitor-24": Monitor24,
  "monitor-27-4k": Monitor27,
  "monitor-34": Monitor34,
  "lamp-led": LampLed,
  "plant-desk": PlantDesk,
  "stand-laptop": LaptopStand,
  "kit-peripherals": PeripheralsKit,
  "webcam-hd": WebcamHd,
  "whiteboard-glass": WhiteboardGlass,
  "power-strip": PowerStrip,
};

export function ProductIllustration({
  productId,
  className,
  style,
}: {
  productId: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Component = layerComponents[productId];
  if (!Component) {
    return null;
  }
  return <Component className={className} style={style} />;
}
