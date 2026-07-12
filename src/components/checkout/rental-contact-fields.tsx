import type { RentalContact, RentalContactErrors } from "@/lib/rental-request";
import { cn } from "@/lib/utils";

type Labels = {
  name: string;
  email: string;
  phone: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
};

type Props = {
  values: RentalContact;
  errors: RentalContactErrors;
  labels: Labels;
  onChange: (field: keyof RentalContact, value: string) => void;
};

function Field({
  id,
  label,
  type,
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  error?: string;
  autoComplete: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "border-input bg-background h-10 w-full rounded-lg border px-3 text-sm outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
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

export function RentalContactFields({ values, errors, labels, onChange }: Props) {
  return (
    <div className="grid gap-4">
      <Field
        id="rental-name"
        label={labels.name}
        type="text"
        value={values.name}
        placeholder={labels.namePlaceholder}
        error={errors.name}
        autoComplete="name"
        onChange={(value) => onChange("name", value)}
      />
      <Field
        id="rental-email"
        label={labels.email}
        type="email"
        value={values.email}
        placeholder={labels.emailPlaceholder}
        error={errors.email}
        autoComplete="email"
        onChange={(value) => onChange("email", value)}
      />
      <Field
        id="rental-phone"
        label={labels.phone}
        type="tel"
        value={values.phone}
        placeholder={labels.phonePlaceholder}
        error={errors.phone}
        autoComplete="tel"
        onChange={(value) => onChange("phone", value)}
      />
    </div>
  );
}
