type Props = {
  total: string;
  supportLine: string;
};

/** Primary rental total with supporting weekly/item detail. */
export function SummaryBarTotals({ total, supportLine }: Props) {
  return (
    <div className="min-w-0">
      <p className="font-heading text-xl tracking-tight tabular-nums sm:text-2xl">{total}</p>
      <p className="text-muted-foreground mt-0.5 text-xs leading-snug sm:text-sm">{supportLine}</p>
    </div>
  );
}
