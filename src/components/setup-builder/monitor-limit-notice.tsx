type Props = {
  message: string;
};

export function MonitorLimitNotice({ message }: Props) {
  return (
    <output className="text-muted-foreground rounded-xl border border-dashed px-3 py-2 text-xs leading-relaxed">
      {message}
    </output>
  );
}
