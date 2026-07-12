import { Button } from "@/components/ui/button";

type Props = {
  weeklyLabel: string;
  totalLabel: string;
  submitLabel: string;
  canSubmit: boolean;
};

export function RentalTotals({ weeklyLabel, totalLabel, submitLabel, canSubmit }: Props) {
  return (
    <div className="border-border/70 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="font-heading text-2xl tracking-tight tabular-nums sm:text-3xl">
          {totalLabel}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">{weeklyLabel}</p>
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-11 w-full shrink-0 px-5 sm:w-auto"
        disabled={!canSubmit}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
