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
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
      <h2 className="font-heading mb-10 text-3xl tracking-tight md:text-4xl">{heading}</h2>
      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="font-heading text-primary/70 text-sm tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-xl font-medium tracking-tight">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
