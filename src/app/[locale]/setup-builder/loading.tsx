export default function SetupBuilderLoading() {
  return (
    <div
      className="flex h-[calc(100dvh-3.75rem)] min-h-0 w-full flex-1 flex-col overflow-hidden"
      aria-busy="true"
      aria-label="Loading setup builder"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex min-h-0 flex-col gap-3">
          <div className="bg-muted min-h-0 flex-1 animate-pulse rounded-xl" />
          <div className="bg-muted h-24 shrink-0 animate-pulse rounded-xl" />
          <div className="bg-muted h-10 shrink-0 animate-pulse rounded-lg lg:hidden" />
        </div>
        <div className="bg-muted hidden min-h-0 animate-pulse rounded-xl lg:block" />
      </div>
    </div>
  );
}
