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
      deskId: "desk-electric",
      chairId: "chair-ergonomic",
      accessoryIds: [],
      rentalWeeks: 4,
    });
  });

  it("sets desk and chair", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mechanical");
    store.setChairId("chair-task");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-mechanical");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-task");
  });

  it("ignores invalid desk and chair ids", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("not-a-desk");
    store.setChairId("monitor-24");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-electric");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-ergonomic");
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

  it("replaces exclusive lamp layer", () => {
    const store = useSetupBuilderStore.getState();
    store.toggleAccessory("lamp-led");
    store.toggleAccessory("plant-desk");

    expect(useSetupBuilderStore.getState().accessoryIds).toEqual(["lamp-led", "plant-desk"]);
  });

  it("resets to defaults", () => {
    const store = useSetupBuilderStore.getState();
    store.setDeskId("desk-mechanical");
    store.toggleAccessory("lamp-led");
    store.reset();

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-electric");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
  });

  it("applies a named preset", () => {
    const store = useSetupBuilderStore.getState();
    store.applyPreset("focus");

    expect(useSetupBuilderStore.getState().deskId).toBe("desk-mechanical");
    expect(useSetupBuilderStore.getState().chairId).toBe("chair-task");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([
      "monitor-24",
      "plant-desk",
      "whiteboard-glass",
    ]);
  });

  it("clears the setup for an empty session state", () => {
    const store = useSetupBuilderStore.getState();
    store.applyPreset("essentials");
    store.clearSetup();

    expect(useSetupBuilderStore.getState().deskId).toBe("");
    expect(useSetupBuilderStore.getState().chairId).toBe("");
    expect(useSetupBuilderStore.getState().accessoryIds).toEqual([]);
  });

  it("sanitizes corrupt persisted setup", () => {
    const sanitized = sanitizePersistedSetup({
      deskId: "missing-desk",
      chairId: "also-missing",
      accessoryIds: ["monitor-24", "monitor-27-4k", "monitor-34", "ghost-item", "lamp-led"],
      rentalWeeks: 99,
    });

    expect(sanitized).toEqual({
      deskId: "desk-electric",
      chairId: "chair-ergonomic",
      accessoryIds: ["monitor-24", "monitor-27-4k", "lamp-led"],
      rentalWeeks: 4,
    });
  });
});
