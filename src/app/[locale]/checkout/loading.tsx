export default function CheckoutLoading() {
  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-14"
      aria-busy="true"
      aria-label="Loading checkout"
    >
      <div className="max-w-xl space-y-3">
        <div className="bg-muted h-10 w-48 animate-pulse rounded" />
        <div className="bg-muted h-4 w-full max-w-md animate-pulse rounded" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-muted min-h-64 animate-pulse rounded-2xl" />
        <div className="bg-muted min-h-56 animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}
