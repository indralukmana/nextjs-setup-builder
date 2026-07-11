"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getProductById } from "@/data/catalog";

const MAX_MONITORS = 2;

type SetupBuilderState = {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  rentalWeeks: number;
  hydrated: boolean;
  setDeskId: (id: string) => void;
  setChairId: (id: string) => void;
  toggleAccessory: (id: string) => void;
  setRentalWeeks: (weeks: number) => void;
  reset: () => void;
  setHydrated: (value: boolean) => void;
};

const defaults = {
  deskId: "desk-electric",
  chairId: "chair-ergonomic",
  accessoryIds: [] as string[],
  rentalWeeks: 4,
};

export const useSetupBuilderStore = create<SetupBuilderState>()(
  persist(
    (set, get) => ({
      ...defaults,
      hydrated: false,
      setDeskId: (id) => set({ deskId: id }),
      setChairId: (id) => set({ chairId: id }),
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

        if (product.layer === "lamp") {
          const hasLamp = current.some((item) => getProductById(item)?.layer === "lamp");
          if (hasLamp) {
            set({
              accessoryIds: [
                ...current.filter((item) => getProductById(item)?.layer !== "lamp"),
                id,
              ],
            });
            return;
          }
        }

        set({ accessoryIds: [...current, id] });
      },
      setRentalWeeks: (weeks) => set({ rentalWeeks: weeks }),
      reset: () => set({ ...defaults }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "monis-setup-builder",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        deskId: state.deskId,
        chairId: state.chairId,
        accessoryIds: state.accessoryIds,
        rentalWeeks: state.rentalWeeks,
      }),
    },
  ),
);

export function selectSelectedIds(state: SetupBuilderState) {
  return [state.deskId, state.chairId, ...state.accessoryIds];
}
