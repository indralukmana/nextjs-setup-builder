"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MONITOR_PRODUCT_ID } from "@/data/catalog";
import { getPresetById } from "@/data/presets";
import { getProductSync } from "@/lib/catalog-api";

export const MAX_MONITORS = 3;
/** 0 = cleared setup; picker only offers 1–3. */
export type MonitorCount = 0 | 1 | 2 | 3;

export const DRAWER_PRODUCT_IDS = new Set(["drawer-alex"]);

export function isDrawerProductId(id: string) {
  return DRAWER_PRODUCT_IDS.has(id);
}

export type PersistedSetup = {
  deskId?: string;
  chairId?: string;
  accessoryIds?: string[];
  monitorCount?: number;
  rentalWeeks?: number;
};

type SetupBuilderState = {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: MonitorCount;
  rentalWeeks: number;
  setDeskId: (id: string) => void;
  setChairId: (id: string) => void;
  toggleAccessory: (id: string) => void;
  setMonitorCount: (count: MonitorCount) => void;
  setRentalWeeks: (weeks: number) => void;
  applyPreset: (presetId: string) => void;
  loadSetup: (setup: PersistedSetup) => void;
  reset: () => void;
  clearSetup: () => void;
};

export const defaults = {
  deskId: "desk-bollsidan",
  chairId: "chair-alefjall",
  accessoryIds: [] as string[],
  monitorCount: 1 as MonitorCount,
  rentalWeeks: 4,
};

const exclusiveLayers = new Set(["lamp"]);

function isValidDeskId(id: string | undefined) {
  return getProductSync(id ?? "")?.category === "desk";
}

function isValidChairId(id: string | undefined) {
  return getProductSync(id ?? "")?.category === "chair";
}

function sanitizeAccessoryIds(ids: string[] | undefined) {
  const unique = [...new Set(ids ?? [])].filter((id) => {
    const product = getProductSync(id);
    return (
      product?.category === "accessory" && product.layer !== "monitor" && id !== MONITOR_PRODUCT_ID
    );
  });

  const seenExclusive = new Set<string>();
  return unique.filter((id) => {
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
}

function sanitizeMonitorCount(count: number | undefined): MonitorCount {
  if (count === 0 || count === 1 || count === 2 || count === 3) {
    return count;
  }
  return defaults.monitorCount;
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
    monitorCount: sanitizeMonitorCount(persisted?.monitorCount),
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
        if (get().monitorCount >= 3 && !isDrawerProductId(id)) {
          return;
        }
        const product = getProductSync(id);
        if (
          !product ||
          product.category !== "accessory" ||
          product.layer === "monitor" ||
          id === MONITOR_PRODUCT_ID
        ) {
          return;
        }

        const current = get().accessoryIds;
        if (current.includes(id)) {
          set({ accessoryIds: current.filter((item) => item !== id) });
          return;
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
      setMonitorCount: (count) => {
        if (count !== 0 && count !== 1 && count !== 2 && count !== 3) {
          return;
        }
        set({ monitorCount: count });
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
            monitorCount: preset.monitorCount,
            rentalWeeks: preset.rentalWeeks,
          }),
        );
      },
      loadSetup: (setup) => {
        set(sanitizePersistedSetup(setup));
      },
      reset: () => set({ ...defaults }),
      clearSetup: () =>
        set({
          deskId: "",
          chairId: "",
          accessoryIds: [],
          monitorCount: 0,
        }),
    }),
    {
      name: "monis-setup-builder",
      partialize: (state) => ({
        deskId: state.deskId,
        chairId: state.chairId,
        accessoryIds: state.accessoryIds,
        monitorCount: state.monitorCount,
        rentalWeeks: state.rentalWeeks,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizePersistedSetup(persistedState as PersistedSetup | undefined),
      }),
    },
  ),
);

/** Line items for pricing/summary: desk, chair, N× monitor, accessories. */
export function expandSetupLineIds(setup: {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: number;
}) {
  const count = Math.min(Math.max(setup.monitorCount, 0), MAX_MONITORS);
  const monitors = Array.from({ length: count }, () => MONITOR_PRODUCT_ID);
  const accessories =
    count >= 3 ? setup.accessoryIds.filter((id) => isDrawerProductId(id)) : setup.accessoryIds;
  return [setup.deskId, setup.chairId, ...monitors, ...accessories].filter((id) => id.length > 0);
}

export function selectSelectedIds(state: SetupBuilderState) {
  return expandSetupLineIds(state);
}
