import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

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
        <Link href="/setup-builder" className={cn(buttonVariants({ size: "lg" }))}>
          {cta}
        </Link>
      </div>
    </section>
  );
}
