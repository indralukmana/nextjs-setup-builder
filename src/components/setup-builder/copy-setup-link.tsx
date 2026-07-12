"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const COPIED_RESET_MS = 2000;

export function CopySetupLink() {
  const t = useTranslations("SetupBuilder");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? t("copyLinkCopied") : t("copyLink")}
    </Button>
  );
}
