"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultCurrencyForLocale, isCurrencyCode, type CurrencyCode } from "@/lib/currency";

type CurrencyState = {
  currency: CurrencyCode;
  /** True once the user explicitly picks a currency (or after rehydrate). */
  userSelected: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  /** Seed from locale only when the user has not chosen yet. */
  ensureDefaultForLocale: (locale: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "USD",
      userSelected: false,
      setCurrency: (currency) => set({ currency, userSelected: true }),
      ensureDefaultForLocale: (locale) => {
        if (get().userSelected) return;
        set({ currency: defaultCurrencyForLocale(locale) });
      },
    }),
    {
      name: "monis-currency",
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CurrencyState> | undefined;
        const currency =
          persisted?.currency && isCurrencyCode(persisted.currency)
            ? persisted.currency
            : currentState.currency;
        return {
          ...currentState,
          currency,
          userSelected: Boolean(persisted?.userSelected),
        };
      },
    },
  ),
);
