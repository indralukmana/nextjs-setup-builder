"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const FEEDBACK_RESET_MS = 2000;

function canShare(url: string) {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    (!navigator.canShare || navigator.canShare({ url }))
  );
}

export function CopySetupLink({ className }: { className?: string }) {
  const t = useTranslations("SetupBuilder");
  const [feedback, setFeedback] = useState<"idle" | "copied" | "shared">("idle");
  const [shareAvailable, setShareAvailable] = useState(false);

  useEffect(() => {
    setShareAvailable(canShare(window.location.href));
  }, []);

  useEffect(() => {
    if (feedback === "idle") {
      return;
    }
    const timer = window.setTimeout(() => setFeedback("idle"), FEEDBACK_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const label =
    feedback === "copied"
      ? t("copyLinkCopied")
      : feedback === "shared"
        ? t("shareLinkShared")
        : shareAvailable
          ? t("shareLink")
          : t("copyLink");

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={async () => {
        const url = window.location.href;
        try {
          if (canShare(url)) {
            await navigator.share({ title: t("shareTitle"), url });
            setFeedback("shared");
            return;
          }
          await navigator.clipboard.writeText(url);
          setFeedback("copied");
        } catch {
          try {
            await navigator.clipboard.writeText(url);
            setFeedback("copied");
          } catch {
            setFeedback("idle");
          }
        }
      }}
    >
      {label}
    </Button>
  );
}
