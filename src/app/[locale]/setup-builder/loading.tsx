export default function SetupBuilderLoading() {
  return (
    <div
      className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[1.1fr_0.9fr]"
      aria-busy="true"
      aria-label="Loading setup builder"
    >
      <div className="flex flex-col gap-4">
        <div className="bg-muted h-9 w-48 animate-pulse rounded" />
        <div className="bg-muted min-h-[20rem] animate-pulse rounded-2xl sm:min-h-[22rem] md:min-h-[28rem]" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-muted h-8 w-full max-w-xs animate-pulse rounded-lg" />
        <div className="bg-muted h-24 animate-pulse rounded-xl" />
        <div className="bg-muted h-24 animate-pulse rounded-xl" />
        <div className="bg-muted h-24 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
