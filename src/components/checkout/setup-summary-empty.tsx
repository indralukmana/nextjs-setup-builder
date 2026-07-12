import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  emptyLabel: string;
  editLabel: string;
};

export function SetupSummaryEmpty({ emptyLabel, editLabel }: Props) {
  return (
    <div className="text-muted-foreground rounded-xl border border-dashed px-4 py-8 text-center text-sm">
      <p>{emptyLabel}</p>
      <Link
        href="/setup-builder"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}
      >
        {editLabel}
      </Link>
    </div>
  );
}
