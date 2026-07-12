"use client";

import type { ReactNode } from "react";
import type { Value } from "react-phone-number-input";

import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  defaultCountry?: "ID" | "US" | "DE" | "GB" | "AU" | "SG" | "MY";
  labelAction?: ReactNode;
  onBlur?: () => void;
  onChange: (value: string) => void;
};

export function RentalPhoneField({
  id,
  label,
  value,
  placeholder,
  error,
  disabled = false,
  required = false,
  defaultCountry = "ID",
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
      <PhoneInput
        id={id}
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        value={(value || undefined) as Value | undefined}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={(next) => onChange(next ?? "")}
        className={cn(
          "rounded-lg focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "opacity-60",
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
