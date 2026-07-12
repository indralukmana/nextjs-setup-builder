import { Button } from "@/components/ui/button";

type Props = {
  weeklyLabel: string;
  totalLabel: string;
  submitLabel: string;
  canSubmit: boolean;
};

export function RentalTotals({ weeklyLabel, totalLabel, submitLabel, canSubmit }: Props) {
  return (
    <div className="border-border/70 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="text-sm">
        <p className="text-muted-foreground">{weeklyLabel}</p>
        <p className="font-heading mt-1 text-2xl tracking-tight">{totalLabel}</p>
      </div>
      <Button type="submit" size="lg" className="h-11 w-full px-5 sm:w-auto" disabled={!canSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
}
