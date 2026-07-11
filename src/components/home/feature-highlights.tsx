type Highlight = {
  title: string;
  description: string;
};

type Props = {
  heading: string;
  items: Highlight[];
};

export function FeatureHighlights({ heading, items }: Props) {
  return (
    <section className="border-border/60 border-t py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="flex flex-col gap-2">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
