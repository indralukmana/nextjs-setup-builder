"use client";

import { CircleHelpIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint: string;
  /** Accessible name for the help control. */
  hintLabel: string;
  htmlFor?: string;
  className?: string;
};

/** Label row with a compact “?” tooltip for short field explanations. */
export function LabelWithHint({ label, hint, hintLabel, htmlFor, className }: Props) {
  const text = (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{label}</span>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground inline-flex size-5 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={hintLabel}
            />
          }
        >
          <CircleHelpIcon className="size-3.5" aria-hidden />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[14rem] text-left leading-relaxed">
          {hint}
        </TooltipContent>
      </Tooltip>
    </span>
  );

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {text}
      </label>
    );
  }

  return <span className="text-sm font-medium">{text}</span>;
}
