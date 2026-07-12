"use client";

import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
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
    <output className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-heading text-5xl tracking-tight text-[#1f3d2f] sm:text-6xl">monis</p>
        <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-muted-foreground text-base leading-relaxed text-pretty sm:text-lg">
          {body}
        </p>
      </div>

      {requestId && requestIdLabel ? (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground font-mono text-sm tracking-wide break-all">
            {requestIdLabel}
          </p>
          <button
            type="button"
            className="text-foreground/80 hover:text-foreground self-start text-sm underline-offset-4 hover:underline"
            onClick={async () => {
              const snippet = [title, body, requestIdLabel].filter(Boolean).join("\n\n");
              try {
                await navigator.clipboard.writeText(snippet);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? copyRequestIdCopiedLabel : copyRequestIdLabel}
          </button>
        </div>
      ) : null}

      <div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 w-full justify-center px-5 sm:w-auto",
          )}
        >
          {backHomeLabel}
        </Link>
      </div>
    </output>
  );
}
