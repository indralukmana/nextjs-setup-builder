"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getProductById } from "@/data/catalog";

export const MAX_MONITORS = 2;

type PersistedSetup = {
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
  reset: () => void;
};

export const defaults = {
  deskId: "desk-electric",
  chairId: "chair-ergonomic",
  accessoryIds: [] as string[],
  rentalWeeks: 4,
};

function isValidDeskId(id: string | undefined) {
  return getProductById(id ?? "")?.category === "desk";
}

function isValidChairId(id: string | undefined) {
  return getProductById(id ?? "")?.category === "chair";
}

function sanitizeAccessoryIds(ids: string[] | undefined) {
  const unique = [...new Set(ids ?? [])].filter(
    (id) => getProductById(id)?.category === "accessory",
  );

  const monitors: string[] = [];
  const rest: string[] = [];

  for (const id of unique) {
    if (getProductById(id)?.layer === "monitor") {
      if (monitors.length < MAX_MONITORS) {
        monitors.push(id);
      }
      continue;
    }
    rest.push(id);
  }

  // Keep at most one lamp / plant / laptop-stand style exclusive layer.
  const seenExclusive = new Set<string>();
  const exclusiveLayers = new Set(["lamp", "plant"]);
  const filteredRest = rest.filter((id) => {
    const layer = getProductById(id)?.layer;
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
        const product = getProductById(id);
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
            (item) => getProductById(item)?.layer === "monitor",
          ).length;
          if (monitorCount >= MAX_MONITORS) {
            return;
          }
        }

        if (product.layer === "lamp" || product.layer === "plant") {
          const layer = product.layer;
          const hasSameLayer = current.some((item) => getProductById(item)?.layer === layer);
          if (hasSameLayer) {
            set({
              accessoryIds: [
                ...current.filter((item) => getProductById(item)?.layer !== layer),
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
  return accessoryIds.filter((id) => getProductById(id)?.layer === "monitor").length;
}
