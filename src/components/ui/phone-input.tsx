"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    return (
      <RPNInput.default
        ref={ref}
        className={cn("flex w-full", className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        smartCaret={false}
        value={value || undefined}
        onChange={(next) => onChange?.(next ?? ("" as RPNInput.Value))}
        {...props}
      />
    );
  },
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "border-input bg-background h-10 w-full min-w-0 rounded-e-lg rounded-s-none border border-l-0 px-2.5 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:z-10 focus-visible:ring-3",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3",
        className,
      )}
      {...props}
    />
  ),
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

function CountrySelect({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            type="button"
            variant="outline"
            className={cn(
              "border-input h-10 gap-1.5 rounded-e-none rounded-s-lg border-r-0 px-2.5 focus:z-10",
              disabled && "opacity-50",
            )}
          />
        }
      >
        <FlagComponent country={selectedCountry} countryName={selectedCountry} />
        {selectedCountry ? (
          <span className="text-muted-foreground text-xs tabular-nums">
            +{RPNInput.getCountryCallingCode(selectedCountry)}
          </span>
        ) : null}
        <ChevronsUpDownIcon
          className={cn("size-3.5 opacity-50", disabled && "hidden")}
          aria-hidden
        />
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] gap-0 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country…" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryList.map(({ value, label }) =>
                value ? (
                  <CountrySelectOption
                    key={value}
                    country={value}
                    countryName={label}
                    selectedCountry={selectedCountry}
                    onChange={onChange}
                    onSelectComplete={() => setOpen(false)}
                  />
                ) : null,
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type CountrySelectOptionProps = RPNInput.FlagProps & {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
};

function CountrySelectOption({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) {
  const selected = country === selectedCountry;

  return (
    <CommandItem
      className="gap-2"
      value={`${countryName} ${country}`}
      data-checked={selected ? true : undefined}
      onSelect={() => {
        onChange(country);
        onSelectComplete();
      }}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 truncate">{countryName}</span>
      <span className="text-muted-foreground text-xs">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
    </CommandItem>
  );
}

function FlagComponent({ country, countryName }: RPNInput.FlagProps) {
  const Flag = country ? flags[country] : undefined;

  return (
    <span className="bg-foreground/10 relative block h-4 w-6 shrink-0 overflow-hidden rounded-sm [&_svg]:size-full">
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  );
}

export { PhoneInput };
