"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getPresetById } from "@/data/presets";
import { getProductSync } from "@/lib/catalog-api";

export const MAX_MONITORS = 2;

export type PersistedSetup = {
  deskId?: string;
  chairId?: string;
  accessoryIds?: string[];
  rentalWeeks?: number;
};

type SetupBuilderState = {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  rentalWeeks: number;
  setDeskId: (id: string) => void;
  setChairId: (id: string) => void;
  toggleAccessory: (id: string) => void;
  setRentalWeeks: (weeks: number) => void;
  applyPreset: (presetId: string) => void;
  reset: () => void;
};

export const defaults = {
  deskId: "desk-electric",
  chairId: "chair-ergonomic",
  accessoryIds: [] as string[],
  rentalWeeks: 4,
};

const exclusiveLayers = new Set(["lamp", "plant", "webcam", "whiteboard", "power"]);

function isValidDeskId(id: string | undefined) {
  return getProductSync(id ?? "")?.category === "desk";
}

function isValidChairId(id: string | undefined) {
  return getProductSync(id ?? "")?.category === "chair";
}

function sanitizeAccessoryIds(ids: string[] | undefined) {
  const unique = [...new Set(ids ?? [])].filter(
    (id) => getProductSync(id)?.category === "accessory",
  );

  const monitors: string[] = [];
  const rest: string[] = [];

  for (const id of unique) {
    if (getProductSync(id)?.layer === "monitor") {
      if (monitors.length < MAX_MONITORS) {
        monitors.push(id);
      }
      continue;
    }
    rest.push(id);
  }

  const seenExclusive = new Set<string>();
  const filteredRest = rest.filter((id) => {
    const layer = getProductSync(id)?.layer;
    if (!layer || !exclusiveLayers.has(layer)) {
      return true;
    }
    if (seenExclusive.has(layer)) {
      return false;
    }
    seenExclusive.add(layer);
    return true;
  });

  return [...monitors, ...filteredRest];
}

function sanitizeRentalWeeks(weeks: number | undefined) {
  if (weeks === 1 || weeks === 4 || weeks === 12) {
    return weeks;
  }
  return defaults.rentalWeeks;
}

export function sanitizePersistedSetup(persisted: PersistedSetup | undefined) {
  return {
    deskId: isValidDeskId(persisted?.deskId) ? persisted!.deskId! : defaults.deskId,
    chairId: isValidChairId(persisted?.chairId) ? persisted!.chairId! : defaults.chairId,
    accessoryIds: sanitizeAccessoryIds(persisted?.accessoryIds),
    rentalWeeks: sanitizeRentalWeeks(persisted?.rentalWeeks),
  };
}

export const useSetupBuilderStore = create<SetupBuilderState>()(
  persist(
    (set, get) => ({
      ...defaults,
      setDeskId: (id) => {
        if (!isValidDeskId(id)) {
          return;
        }
        set({ deskId: id });
      },
      setChairId: (id) => {
        if (!isValidChairId(id)) {
          return;
        }
        set({ chairId: id });
      },
      toggleAccessory: (id) => {
        const product = getProductSync(id);
        if (!product || product.category !== "accessory") {
          return;
        }

        const current = get().accessoryIds;
        if (current.includes(id)) {
          set({ accessoryIds: current.filter((item) => item !== id) });
          return;
        }

        if (product.layer === "monitor") {
          const monitorCount = current.filter(
            (item) => getProductSync(item)?.layer === "monitor",
          ).length;
          if (monitorCount >= MAX_MONITORS) {
            return;
          }
        }

        if (exclusiveLayers.has(product.layer)) {
          const layer = product.layer;
          const hasSameLayer = current.some((item) => getProductSync(item)?.layer === layer);
          if (hasSameLayer) {
            set({
              accessoryIds: [
                ...current.filter((item) => getProductSync(item)?.layer !== layer),
                id,
              ],
            });
            return;
          }
        }

        set({ accessoryIds: [...current, id] });
      },
      setRentalWeeks: (weeks) => {
        if (weeks !== 1 && weeks !== 4 && weeks !== 12) {
          return;
        }
        set({ rentalWeeks: weeks });
      },
      applyPreset: (presetId) => {
        const preset = getPresetById(presetId);
        if (!preset) {
          return;
        }
        set(
          sanitizePersistedSetup({
            deskId: preset.deskId,
            chairId: preset.chairId,
            accessoryIds: preset.accessoryIds,
            rentalWeeks: preset.rentalWeeks,
          }),
        );
      },
      reset: () => set({ ...defaults }),
    }),
    {
      name: "monis-setup-builder",
      partialize: (state) => ({
        deskId: state.deskId,
        chairId: state.chairId,
        accessoryIds: state.accessoryIds,
        rentalWeeks: state.rentalWeeks,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizePersistedSetup(persistedState as PersistedSetup | undefined),
      }),
    },
  ),
);

export function selectSelectedIds(state: SetupBuilderState) {
  return [state.deskId, state.chairId, ...state.accessoryIds];
}

export function countMonitors(accessoryIds: string[]) {
  return accessoryIds.filter((id) => getProductSync(id)?.layer === "monitor").length;
}
