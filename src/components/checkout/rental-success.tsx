import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  requestIdLabel?: string;
  backHomeLabel: string;
  editSetupLabel: string;
};

export function RentalSuccess({
  title,
  body,
  requestIdLabel,
  backHomeLabel,
  editSetupLabel,
}: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border bg-[linear-gradient(160deg,rgba(220,235,205,0.55),rgba(255,255,255,0.7))] px-5 py-7">
      <div className="bg-primary/15 size-2.5 rounded-full" aria-hidden />
      <div>
        <p className="font-heading text-xl tracking-tight">{title}</p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">{body}</p>
        {requestIdLabel ? (
          <p className="text-muted-foreground mt-3 font-mono text-xs tracking-wide">
            {requestIdLabel}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          {backHomeLabel}
        </Link>
        <Link href="/setup-builder" className={cn(buttonVariants({ variant: "ghost" }))}>
          {editSetupLabel}
        </Link>
      </div>
    </div>
  );
}
