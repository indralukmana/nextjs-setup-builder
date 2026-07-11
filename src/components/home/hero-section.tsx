import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = {
  title: string;
  cta: string;
};

export function HeroSection({ title, cta }: Props) {
  return (
    <section className="flex flex-col gap-6 py-16">
      <p className="text-sm font-medium tracking-wide uppercase">monis</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      <div>
        <Button size="lg" render={<Link href="/setup-builder" />}>
          {cta}
        </Button>
      </div>
    </section>
  );
}
