export default function CheckoutLoading() {
  return (
    <div
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-10"
      aria-busy="true"
      aria-label="Loading checkout"
    >
      <div className="max-w-2xl space-y-3">
        <div className="bg-muted h-10 w-48 animate-pulse rounded" />
        <div className="bg-muted h-4 w-full max-w-md animate-pulse rounded" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="bg-muted order-2 min-h-56 animate-pulse rounded-xl lg:order-1" />
        <div className="bg-muted order-1 min-h-64 animate-pulse rounded-xl lg:order-2" />
      </div>
    </div>
  );
}
