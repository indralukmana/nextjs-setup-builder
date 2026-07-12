import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  editLabel: string;
};

export function SetupSummaryHeader({ heading, editLabel }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-heading text-lg tracking-tight">{heading}</h2>
      <Link
        href="/setup-builder"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}
      >
        {editLabel}
      </Link>
    </div>
  );
}
