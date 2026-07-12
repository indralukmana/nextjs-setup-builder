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
    <section className="border-border/50 border-t bg-[linear-gradient(180deg,transparent,rgba(180,200,160,0.12))]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-heading mb-10 max-w-md text-3xl tracking-tight md:text-4xl">
          {heading}
        </h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <article key={item.title} className="flex flex-col gap-3">
              <div className="bg-primary/70 h-1 w-10 rounded-full" />
              <h3 className="font-heading text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
