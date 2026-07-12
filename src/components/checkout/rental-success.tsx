"use client";

import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  requestId?: string;
  requestIdLabel?: string;
  copyRequestIdLabel: string;
  copyRequestIdCopiedLabel: string;
  backHomeLabel: string;
  editSetupLabel: string;
};

const COPY_RESET_MS = 2000;

export function RentalSuccess({
  title,
  body,
  requestId,
  requestIdLabel,
  copyRequestIdLabel,
  copyRequestIdCopiedLabel,
  backHomeLabel,
  editSetupLabel,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), COPY_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border bg-[linear-gradient(160deg,rgba(220,235,205,0.55),rgba(255,255,255,0.7))] px-5 py-7">
      <div className="bg-primary/15 size-2.5 rounded-full" aria-hidden />
      <div>
        <p className="font-heading text-xl tracking-tight">{title}</p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">{body}</p>
        {requestIdLabel ? (
          <p className="text-muted-foreground mt-3 font-mono text-xs tracking-wide">
            {requestIdLabel}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        {requestId ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={async () => {
              const snippet = [title, body, requestIdLabel ?? `Request ID: ${requestId}`]
                .filter(Boolean)
                .join("\n\n");
              try {
                await navigator.clipboard.writeText(snippet);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? copyRequestIdCopiedLabel : copyRequestIdLabel}
          </Button>
        ) : null}
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          {backHomeLabel}
        </Link>
        <Link href="/setup-builder" className={cn(buttonVariants({ variant: "ghost" }))}>
          {editSetupLabel}
        </Link>
      </div>
    </div>
  );
}
