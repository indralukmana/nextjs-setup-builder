"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { parseSetupSearchParams, serializeSetupSearchParams } from "@/lib/setup-url";
import { sanitizeSetupFields, useSetupBuilderStore } from "@/store/setup-builder-store";

const WRITE_DEBOUNCE_MS = 250;

/**
 * Survives Suspense remounts of this component. Without it, a remount while the
 * store is ahead of the URL re-applies the stale query and wipes user edits
 * before the URL write can land — common on production builds.
 */
let lastAppliedSearch: string | null = null;

function locationQuery() {
  return window.location.search.replace(/^\?/, "");
}

function replaceLocationQuery(nextQuery: string) {
  const url = `${window.location.pathname}?${nextQuery}${window.location.hash}`;
  // Query-only updates via the App Router/next-intl replace are unreliable on
  // production builds (store moves, address bar does not). History is sync and
  // is what Playwright/share links actually read.
  window.history.replaceState(window.history.state ?? {}, "", url);
}

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
  const appliedUrlRef = useRef(false);
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const search = searchParams.toString();
  const accessoriesKey = accessoryIds.join(",");

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (lastAppliedSearch === search) {
      appliedUrlRef.current = true;
      return;
    }

    lastAppliedSearch = search;
    appliedUrlRef.current = true;

    // Persist merge usually already applied the query; re-apply here so soft
    // client navigations and non-persist first loads still win over defaults.
    const fromUrl = parseSetupSearchParams(searchParams);
    if (fromUrl) {
      useSetupBuilderStore.setState(sanitizeSetupFields(fromUrl));
    }
  }, [hydrated, search, searchParams]);

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
    if (nextQuery === locationQuery()) {
      setUrlSynced(true);
      lastAppliedSearch = nextQuery;
      return;
    }

    setUrlSynced(false);
    const timer = window.setTimeout(() => {
      replaceLocationQuery(nextQuery);
      lastAppliedSearch = nextQuery;
      setUrlSynced(true);
    }, WRITE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [accessoriesKey, accessoryIds, chairId, deskId, hydrated, monitorCount, rentalWeeks]);

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.setupUrlSynced;
    };
  }, []);

  return null;
}
