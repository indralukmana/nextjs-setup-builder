"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { usePathname, useRouter } from "@/i18n/navigation";
import { parseSetupSearchParams, serializeSetupSearchParams } from "@/lib/setup-url";
import { sanitizeSetupFields, useSetupBuilderStore } from "@/store/setup-builder-store";

const WRITE_DEBOUNCE_MS = 250;

function setUrlSynced(synced: boolean) {
  if (synced) {
    document.documentElement.dataset.setupUrlSynced = "true";
  } else {
    delete document.documentElement.dataset.setupUrlSynced;
  }
}

export function SetupUrlSync() {
  const hydrated = useSetupBuilderHydrated();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const appliedUrlRef = useRef(false);
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);

  useEffect(() => {
    if (!hydrated || appliedUrlRef.current) {
      return;
    }
    appliedUrlRef.current = true;

    const fromUrl = parseSetupSearchParams(searchParams);
    if (fromUrl) {
      useSetupBuilderStore.setState(sanitizeSetupFields(fromUrl));
    }
  }, [hydrated, searchParams]);

  useEffect(() => {
    if (!hydrated || !appliedUrlRef.current) {
      return;
    }

    const nextQuery = serializeSetupSearchParams({
      deskId,
      chairId,
      accessoryIds,
      monitorCount,
      rentalWeeks,
    });
    const currentQuery = searchParams.toString();
    if (nextQuery === currentQuery) {
      setUrlSynced(true);
      return;
    }

    setUrlSynced(false);
    const timer = window.setTimeout(() => {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }, WRITE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [
    accessoryIds,
    chairId,
    deskId,
    hydrated,
    monitorCount,
    pathname,
    rentalWeeks,
    router,
    searchParams,
  ]);

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.setupUrlSynced;
    };
  }, []);

  return null;
}
