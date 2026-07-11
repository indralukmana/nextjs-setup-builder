import { beforeEach, describe, expect, it } from "vitest";

import { useSetupBuilderStore } from "@/store/setup-builder-store";

const memoryStorage = (() => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: memoryStorage,
  configurable: true,
});

describe("setup-builder-store", () => {
  beforeEach(() => {
    memoryStorage.clear();
    useSetupBuilderStore.setState({
      deskId: "desk-electric",
      chairId: "chair-ergonomic",
      accessoryIds: [],
      rentalWeeks: 4,
      hydrated: true,
    });
  });

  it("sets desk and chair", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mechanical");
    store.setChairId("chair-task");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-mechanical");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-task");
  });

  it("toggles accessories and respects monitor limit", () => {
    const store = useSetupBuilderStore.getState();
    store.toggleAccessory("monitor-24");
    store.toggleAccessory("monitor-27-4k");
    store.toggleAccessory("monitor-34");

    expect(useSetupBuilderStore.getState().accessoryIds).toEqual(["monitor-24", "monitor-27-4k"]);

    store.toggleAccessory("monitor-24");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual(["monitor-27-4k"]);
  });

  it("resets to defaults", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mechanical");
    store.toggleAccessory("lamp-led");
    store.reset();

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-electric");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
  });
});
