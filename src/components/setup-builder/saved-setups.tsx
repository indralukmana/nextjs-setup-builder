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
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const loadSetup = useSetupBuilderStore((state) => state.loadSetup);
  const [entries, setEntries] = useState<SavedSetup[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setEntries(readSavedSetups());
  }, []);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-dashed px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">{t("label")}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const name = window.prompt(t("prompt"));
            if (name === null) {
              return;
            }
            const result = saveCurrentSetup(name, {
              deskId,
              chairId,
              accessoryIds,
              rentalWeeks,
            });
            if (!result.ok) {
              setMessage(
                result.reason === "full" ? t("full", { max: MAX_SAVED_SETUPS }) : t("emptyName"),
              );
              return;
            }
            setMessage(null);
            setEntries(result.entries);
          }}
        >
          {t("save")}
        </Button>
      </div>
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
  );
}
