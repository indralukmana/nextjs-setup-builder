import type { PersistedSetup } from "@/store/setup-builder-store";

export function hasSetupSearchParams(params: URLSearchParams) {
  return (
    params.has("desk") ||
    params.has("chair") ||
    params.has("accessories") ||
    params.has("monitors") ||
    params.has("weeks")
  );
}

export function parseSetupSearchParams(params: URLSearchParams): PersistedSetup | null {
  if (!hasSetupSearchParams(params)) {
    return null;
  }

  const accessories = params.get("accessories");
  const monitors = params.get("monitors");

  return {
    deskId: params.get("desk") ?? undefined,
    chairId: params.get("chair") ?? undefined,
    accessoryIds:
      accessories === null
        ? undefined
        : accessories
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean),
    monitorCount: monitors === null ? undefined : Number(monitors),
    rentalWeeks: params.has("weeks") ? Number(params.get("weeks")) : undefined,
  };
}

export function serializeSetupSearchParams(setup: {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: number;
  rentalWeeks: number;
}) {
  const params = new URLSearchParams();
  params.set("desk", setup.deskId);
  params.set("chair", setup.chairId);
  params.set("accessories", setup.accessoryIds.join(","));
  params.set("monitors", String(setup.monitorCount));
  params.set("weeks", String(setup.rentalWeeks));
  return params.toString();
}
