import { MONITOR_PRODUCT_ID } from "@/data/catalog";
import { getProductSync } from "@/lib/catalog-api";
import type { PreviewLayer } from "@/types/catalog";

const I = "/models/ikea";

/** Per-SKU IKEA/gaming GLBs — demo meshes, not Monis product scans. */
export const PRODUCT_SCENE_MODELS: Record<string, { src: string; fitHeight: number }> = {
  "desk-bollsidan": { src: `${I}/bollsidan-desk-sitstand-electric-white.glb`, fitHeight: 0.73 },
  "desk-mittzon": { src: `${I}/mittzon-desk-walnut-black.glb`, fitHeight: 0.74 },
  "desk-utespelare": { src: `${I}/utespelare-gaming-desk-black.glb`, fitHeight: 0.74 },

  "chair-alefjall": { src: `${I}/alefjall-office-chair-glose-black.glb`, fitHeight: 0.85 },
  "chair-gronfjall": {
    src: `${I}/gronfjall-office-chair-armrests-gray-green-white.glb`,
    fitHeight: 1.08,
  },
  "chair-gronfjall-headrest": {
    src: `${I}/gronfjall-office-chair-armheadrest-gray-black.glb`,
    fitHeight: 1.22,
  },

  [MONITOR_PRODUCT_ID]: { src: `${I}/gaming-monitor.glb`, fitHeight: 0.42 },

  "lamp-nymane": { src: `${I}/nymane-work-lamp-white.glb`, fitHeight: 0.45 },
  "lamp-svallet": { src: `${I}/svallet-work-lamp-dark-gray-white.glb`, fitHeight: 0.4 },
  "stand-lanespelare": { src: `${I}/lanespelare-accessories-stand.glb`, fitHeight: 0.38 },
  "drawer-alex": { src: `${I}/alex-drawer-unit-black-brown.glb`, fitHeight: 0.7 },
};

export const SCENE_PRELOAD_MODELS = [
  ...new Set(Object.values(PRODUCT_SCENE_MODELS).map((entry) => entry.src)),
] as const;

export type SceneSlotRole = "desk" | "chair" | "monitor" | "accessory" | "drawer";

export type SceneSlot = {
  key: string;
  productId: string;
  role: SceneSlotRole;
  src: string | null;
  fitHeight: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
};

type SetupSelection = {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: number;
};

/** Default desk surface height after fitHeight normalization. */
const DESK_TOP_Y_DEFAULT = 0.74;

const DESK_TOP_Y_BY_DESK: Record<string, number> = {
  "desk-utespelare": 0.75,
  "desk-mittzon": 0.74,
  "desk-bollsidan": 0.75,
};

const MONITOR_Z_DEFAULT = -0.16;
const MONITOR_Z_BY_DESK: Record<string, number> = {
  "desk-utespelare": -0.02,
};

const ACCESSORY_OFFSETS: [number, number, number][] = [
  [0.55, DESK_TOP_Y_DEFAULT, 0.12],
  [-0.55, DESK_TOP_Y_DEFAULT, 0.1],
  [0.35, DESK_TOP_Y_DEFAULT, 0.22],
];

function deskTopY(deskId: string) {
  return DESK_TOP_Y_BY_DESK[deskId] ?? DESK_TOP_Y_DEFAULT;
}

function monitorZ(deskId: string) {
  return MONITOR_Z_BY_DESK[deskId] ?? MONITOR_Z_DEFAULT;
}

/** Layout positions for 1 / 2 / 3 monitors on the active desk. */
export function monitorOffsetsForCount(count: number, deskId: string): [number, number, number][] {
  const y = deskTopY(deskId);
  const z = monitorZ(deskId);
  if (count <= 1) {
    return [[0, y, z]];
  }
  if (count === 2) {
    return [
      [-0.26, y, z],
      [0.26, y, z],
    ];
  }
  return [
    [0, y, z],
    [-0.48, y, z],
    [0.48, y, z],
  ];
}

function roleForLayer(layer: PreviewLayer): SceneSlotRole {
  if (layer === "desk") return "desk";
  if (layer === "chair") return "chair";
  if (layer === "monitor") return "monitor";
  return "accessory";
}

export function resolveSceneModel(productId: string): { src: string; fitHeight: number } | null {
  return PRODUCT_SCENE_MODELS[productId] ?? null;
}

function transformFor(
  role: SceneSlotRole,
  productId: string,
  indexInRole: number,
  selection: SetupSelection,
): Pick<SceneSlot, "position" | "rotation" | "scale"> {
  switch (role) {
    case "desk":
      if (productId === "desk-bollsidan") {
        // Mesh is tall/narrow — lower fitHeight, then widen footprint without adding height.
        return { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1.75, 1, 1.5] };
      }
      return { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 };
    case "chair":
      return { position: [0, 0, 1.05], rotation: [0, Math.PI, 0], scale: 1 };
    case "monitor": {
      const offsets = monitorOffsetsForCount(selection.monitorCount, selection.deskId);
      const position = offsets[Math.min(indexInRole, offsets.length - 1)]!;
      return { position, rotation: [0, 0, 0], scale: 1 };
    }
    case "drawer":
      return { position: [1.15, 0, 0], rotation: [0, 0, 0], scale: 1 };
    case "accessory": {
      if (productId === "drawer-alex") {
        return { position: [1.15, 0, 0], rotation: [0, 0, 0], scale: 1 };
      }
      const position = ACCESSORY_OFFSETS[Math.min(indexInRole, ACCESSORY_OFFSETS.length - 1)]!;
      return { position, rotation: [0, 0.25, 0], scale: 1 };
    }
  }
}

/**
 * Build world placements for the composed 3D setup scene from the current selection.
 */
export function buildSceneSlots(selection: SetupSelection): SceneSlot[] {
  const slots: SceneSlot[] = [];
  const roleCounts: Partial<Record<SceneSlotRole, number>> = {};

  const monitorIds = Array.from(
    { length: Math.min(Math.max(selection.monitorCount, 0), 3) },
    () => MONITOR_PRODUCT_ID,
  );

  const accessories =
    selection.monitorCount >= 3
      ? selection.accessoryIds.filter((id) => id === "drawer-alex")
      : selection.accessoryIds.filter((id) => id !== MONITOR_PRODUCT_ID);

  const ids = [selection.deskId, selection.chairId, ...monitorIds, ...accessories].filter(
    (id) => id.length > 0,
  );

  for (const productId of ids) {
    const product = getProductSync(productId);
    if (!product) continue;

    let role = roleForLayer(product.layer);
    if (productId === "drawer-alex") {
      role = "drawer";
    }

    const indexInRole = roleCounts[role] ?? 0;
    roleCounts[role] = indexInRole + 1;

    const model = resolveSceneModel(productId);
    const transform = transformFor(role, productId, indexInRole, selection);
    slots.push({
      key: `${productId}-${indexInRole}`,
      productId,
      role,
      src: model?.src ?? null,
      fitHeight: model?.fitHeight ?? 0.2,
      ...transform,
    });
  }

  return slots;
}
