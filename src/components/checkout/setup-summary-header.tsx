import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  subtitle: string;
  editLabel: string;
};

export function SetupSummaryHeader({ heading, subtitle, editLabel }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-xl tracking-tight">{heading}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
      </div>
      <Link
        href="/setup-builder"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}
      >
        {editLabel}
      </Link>
    </div>
  );
}
