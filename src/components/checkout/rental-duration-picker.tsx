"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const WEEK_OPTIONS = ["1", "4", "12"] as const;

type Props = {
  label: string;
  value: number;
  formatOption: (weeks: number) => string;
  onChange: (weeks: number) => void;
  id?: string;
};

export function RentalDurationPicker({
  label,
  value,
  formatOption,
  onChange,
  id = "rental-weeks",
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium" htmlFor={id}>
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
        className="!grid w-full grid-cols-3 gap-2"
      >
        {WEEK_OPTIONS.map((weeks) => (
          <ToggleGroupItem key={weeks} value={weeks} className="h-11">
            {formatOption(Number(weeks))}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
