"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const WEEK_OPTIONS = ["1", "4", "12"] as const;

type Props = {
  label: string;
  value: number;
  formatOption: (weeks: number) => string;
  onChange: (weeks: number) => void;
  id?: string;
  compact?: boolean;
  /** Single-row control for denser bars (label is screen-reader only). */
  inline?: boolean;
  className?: string;
};

export function RentalDurationPicker({
  label,
  value,
  formatOption,
  onChange,
  id = "rental-weeks",
  compact = false,
  inline = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        inline
          ? "flex items-center gap-2"
          : compact
            ? "flex flex-col gap-1.5"
            : "flex flex-col gap-3",
        className,
      )}
    >
      <label
        className={cn(inline ? "sr-only" : compact ? "text-xs font-medium" : "text-sm font-medium")}
        htmlFor={id}
      >
        {label}
      </label>
      <ToggleGroup
        id={id}
        value={[String(value)]}
        onValueChange={(values) => {
          const next = values[0];
          if (next) {
            onChange(Number(next));
          }
        }}
        variant="outline"
        className={cn(
          "!grid grid-cols-3 gap-1.5",
          inline ? "w-[10.5rem] shrink-0" : "w-full gap-2",
        )}
      >
        {WEEK_OPTIONS.map((weeks) => (
          <ToggleGroupItem
            key={weeks}
            value={weeks}
            className={cn(compact || inline ? "h-8 px-2 text-xs" : "h-11")}
          >
            {formatOption(Number(weeks))}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
