import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  /** Extra control aligned with the label (e.g. “same as phone”). */
  labelAction?: ReactNode;
  onBlur?: () => void;
  onChange: (value: string) => void;
};

export function RentalTextField({
  id,
  label,
  type = "text",
  value,
  placeholder,
  error,
  autoComplete,
  disabled = false,
  required = false,
  labelAction,
  onBlur,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </label>
        {labelAction}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        readOnly={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "border-input bg-background h-10 w-full rounded-lg border px-3 text-sm outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-destructive aria-invalid:ring-destructive/20",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="text-destructive text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
