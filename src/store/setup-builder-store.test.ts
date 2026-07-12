import { beforeEach, describe, expect, it } from "vitest";

import { sanitizePersistedSetup, useSetupBuilderStore } from "@/store/setup-builder-store";

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
      deskId: "desk-bollsidan",
      chairId: "chair-alefjall",
      accessoryIds: [],
      monitorCount: 1,
      rentalWeeks: 4,
    });
  });

  it("sets desk and chair", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mittzon");
    store.setChairId("chair-gronfjall");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-mittzon");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-gronfjall");
  });

  it("ignores invalid desk and chair ids", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("not-a-desk");
    store.setChairId("monitor-gaming");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-bollsidan");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-alefjall");
  });

  it("sets monitor count including none", () => {
    const store = useSetupBuilderStore.getState();
    store.setMonitorCount(0);
    expect(useSetupBuilderStore.getState().monitorCount).toBe(0);
    store.setMonitorCount(3);
    store.toggleAccessory("monitor-gaming");

    expect(useSetupBuilderStore.getState().monitorCount).toBe(3);
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
  });

  it("replaces exclusive lamp layer", () => {
    const store = useSetupBuilderStore.getState();
    store.toggleAccessory("lamp-nymane");
    store.toggleAccessory("lamp-svallet");

    expect(useSetupBuilderStore.getState().accessoryIds).toEqual(["lamp-svallet"]);
  });

  it("resets to defaults", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mittzon");
    store.toggleAccessory("lamp-nymane");
    store.setMonitorCount(2);
    store.reset();

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-bollsidan");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
    expect(useSetupBuilderStore.getState().monitorCount).toBe(1);
  });

  it("applies a named preset", () => {
    const store = useSetupBuilderStore.getState();
    store.applyPreset("focus");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-mittzon");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-gronfjall");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual(["lamp-svallet"]);
    expect(useSetupBuilderStore.getState().monitorCount).toBe(2);
  });

  it("clears the setup for an empty session state", () => {
    const store = useSetupBuilderStore.getState();
    store.applyPreset("essentials");
    store.clearSetup();

    expect(useSetupBuilderStore.getState().deskId).toBe("");
    expect(useSetupBuilderStore.getState().chairId).toBe("");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
    expect(useSetupBuilderStore.getState().monitorCount).toBe(0);
  });

  it("sanitizes corrupt persisted setup", () => {
    const sanitized = sanitizePersistedSetup({
      deskId: "missing-desk",
      chairId: "also-missing",
      accessoryIds: ["monitor-gaming", "ghost-item", "lamp-nymane"],
      monitorCount: 99,
      rentalWeeks: 99,
    });

    expect(sanitized).toEqual({
      deskId: "desk-bollsidan",
      chairId: "chair-alefjall",
      accessoryIds: ["lamp-nymane"],
      monitorCount: 1,
      rentalWeeks: 4,
    });
  });
});
