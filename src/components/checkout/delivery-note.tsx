type Props = {
  title: string;
  body: string;
};

/** Quiet delivery footnote under the setup summary. */
export function DeliveryNote({ title, body }: Props) {
  return (
    <aside className="text-muted-foreground space-y-1 text-sm leading-relaxed">
      <p className="text-foreground/80 font-medium">{title}</p>
      <p className="text-pretty">{body}</p>
    </aside>
  );
}
