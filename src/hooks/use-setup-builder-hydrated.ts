"use client";

import { useSyncExternalStore } from "react";

import { useSetupBuilderStore } from "@/store/setup-builder-store";

function subscribe(onStoreChange: () => void) {
  return useSetupBuilderStore.persist.onFinishHydration(onStoreChange);
}

function getClientSnapshot() {
  return useSetupBuilderStore.persist.hasHydrated();
}

function getServerSnapshot() {
  return false;
}

/** True only after persisted setup state has rehydrated on the client. */
export function useSetupBuilderHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
