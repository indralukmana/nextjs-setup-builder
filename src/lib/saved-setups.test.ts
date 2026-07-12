import { beforeEach, describe, expect, it } from "vitest";

import {
  deleteSavedSetup,
  MAX_SAVED_SETUPS,
  readSavedSetups,
  saveCurrentSetup,
  SAVED_SETUPS_KEY,
} from "@/lib/saved-setups";

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
    get length() {
      return store.size;
    },
    key: () => null,
  } satisfies Storage;
})();

describe("saved-setups", () => {
  beforeEach(() => {
    memoryStorage.clear();
  });

  it("saves and sanitizes setups up to the cap", () => {
    for (let i = 0; i < MAX_SAVED_SETUPS; i += 1) {
      const result = saveCurrentSetup(
        `Setup ${i}`,
        {
          deskId: "desk-mittzon",
          chairId: "ghost",
          accessoryIds: ["lamp-nymane"],
          monitorCount: 2,
          rentalWeeks: 12,
        },
        memoryStorage,
      );
      expect(result.ok).toBe(true);
    }

    const full = saveCurrentSetup(
      "Overflow",
      {
        deskId: "desk-bollsidan",
        chairId: "chair-alefjall",
        accessoryIds: [],
        monitorCount: 1,
        rentalWeeks: 4,
      },
      memoryStorage,
    );
    expect(full).toEqual({ ok: false, reason: "full" });

    const entries = readSavedSetups(memoryStorage);
    expect(entries).toHaveLength(MAX_SAVED_SETUPS);
    expect(entries[0]?.setup.chairId).toBe("chair-alefjall");
    expect(entries[0]?.setup.monitorCount).toBe(2);
    expect(memoryStorage.getItem(SAVED_SETUPS_KEY)).toBeTruthy();
  });

  it("deletes a saved setup by id", () => {
    saveCurrentSetup(
      "Keep",
      {
        deskId: "desk-bollsidan",
        chairId: "chair-alefjall",
        accessoryIds: [],
        monitorCount: 1,
        rentalWeeks: 4,
      },
      memoryStorage,
    );
    const second = saveCurrentSetup(
      "Remove",
      {
        deskId: "desk-mittzon",
        chairId: "chair-gronfjall",
        accessoryIds: [],
        monitorCount: 1,
        rentalWeeks: 1,
      },
      memoryStorage,
    );
    expect(second.ok).toBe(true);
    if (!second.ok) {
      return;
    }
    const id = second.entries[1]!.id;
    const remaining = deleteSavedSetup(id, memoryStorage);
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.name).toBe("Keep");
  });
});
