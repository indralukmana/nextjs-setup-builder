import { sanitizePersistedSetup, type PersistedSetup } from "@/store/setup-builder-store";

export const SAVED_SETUPS_KEY = "monis-saved-setups";
export const MAX_SAVED_SETUPS = 3;

export type SavedSetup = {
  id: string;
  name: string;
  setup: ReturnType<typeof sanitizePersistedSetup>;
};

function createId() {
  return `sv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function readSavedSetups(storage: Storage = localStorage): SavedSetup[] {
  try {
    const raw = storage.getItem(SAVED_SETUPS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter(
        (item): item is { id: string; name: string; setup: PersistedSetup } =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as SavedSetup).id === "string" &&
          typeof (item as SavedSetup).name === "string" &&
          typeof (item as SavedSetup).setup === "object",
      )
      .slice(0, MAX_SAVED_SETUPS)
      .map((item) => ({
        id: item.id,
        name: item.name.trim() || "Saved setup",
        setup: sanitizePersistedSetup(item.setup),
      }));
  } catch {
    return [];
  }
}

export function writeSavedSetups(entries: SavedSetup[], storage: Storage = localStorage) {
  storage.setItem(SAVED_SETUPS_KEY, JSON.stringify(entries.slice(0, MAX_SAVED_SETUPS)));
}

export function saveCurrentSetup(
  name: string,
  setup: PersistedSetup,
  storage: Storage = localStorage,
): { ok: true; entries: SavedSetup[] } | { ok: false; reason: "full" | "empty-name" } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { ok: false, reason: "empty-name" };
  }
  const current = readSavedSetups(storage);
  if (current.length >= MAX_SAVED_SETUPS) {
    return { ok: false, reason: "full" };
  }
  const entries = [
    ...current,
    {
      id: createId(),
      name: trimmed,
      setup: sanitizePersistedSetup(setup),
    },
  ];
  writeSavedSetups(entries, storage);
  return { ok: true, entries };
}

export function deleteSavedSetup(id: string, storage: Storage = localStorage) {
  const entries = readSavedSetups(storage).filter((entry) => entry.id !== id);
  writeSavedSetups(entries, storage);
  return entries;
}
