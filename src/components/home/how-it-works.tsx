type Step = {
  title: string;
  description: string;
};

type Props = {
  heading: string;
  steps: Step[];
};

export function HowItWorks({ heading, steps }: Props) {
  return (
    <section className="border-border/60 border-t py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">{heading}</h2>
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
