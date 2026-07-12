type Props = {
  weeklyLine: string;
  totalLine: string;
};

export function SummaryBarTotals({ weeklyLine, totalLine }: Props) {
  return (
    <div className="min-w-0 text-sm">
      <p className="font-medium">{weeklyLine}</p>
      <p className="text-muted-foreground">{totalLine}</p>
    </div>
  );
}
