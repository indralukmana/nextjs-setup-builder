"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  deleteSavedSetup,
  MAX_SAVED_SETUPS,
  readSavedSetups,
  saveCurrentSetup,
  type SavedSetup,
} from "@/lib/saved-setups";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function SavedSetups() {
  const t = useTranslations("SetupBuilder.saved");
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const loadSetup = useSetupBuilderStore((state) => state.loadSetup);
  const [entries, setEntries] = useState<SavedSetup[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setEntries(readSavedSetups());
  }, []);

  return (
    <details className="rounded-xl border border-dashed px-3 py-2">
      <summary className="cursor-pointer text-sm font-medium select-none">
        {t("label")}
        {entries.length > 0 ? (
          <span className="text-muted-foreground ml-1 font-normal">({entries.length})</span>
        ) : null}
      </summary>
      <div className="mt-3 flex flex-col gap-3">
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const result = saveCurrentSetup(name, {
              deskId,
              chairId,
              accessoryIds,
              monitorCount,
              rentalWeeks,
            });
            if (!result.ok) {
              setMessage(
                result.reason === "full" ? t("full", { max: MAX_SAVED_SETUPS }) : t("emptyName"),
              );
              return;
            }
            setMessage(null);
            setName("");
            setEntries(result.entries);
          }}
        >
          <label className="sr-only" htmlFor="saved-setup-name">
            {t("nameLabel")}
          </label>
          <input
            id="saved-setup-name"
            type="text"
            value={name}
            maxLength={40}
            placeholder={t("namePlaceholder")}
            onChange={(event) => setName(event.target.value)}
            className="border-input bg-background h-8 w-full rounded-lg border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3"
          />
          <Button type="submit" variant="outline" size="sm" className="w-full">
            {t("save")}
          </Button>
        </form>
        {message ? <p className="text-destructive text-xs">{message}</p> : null}
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-xs">{t("empty")}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {entries.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm">{entry.name}</span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => loadSetup(entry.setup)}
                  >
                    {t("load")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEntries(deleteSavedSetup(entry.id));
                      setMessage(null);
                    }}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
