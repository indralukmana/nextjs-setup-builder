type Props = {
  title: string;
  body: string;
};

export function DeliveryNote({ title, body }: Props) {
  return (
    <aside className="rounded-2xl border border-dashed bg-[linear-gradient(160deg,rgba(220,235,205,0.4),rgba(255,255,255,0.55))] px-4 py-4 sm:px-5">
      <p className="font-heading text-base tracking-tight">{title}</p>
      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed text-pretty">{body}</p>
    </aside>
  );
}
