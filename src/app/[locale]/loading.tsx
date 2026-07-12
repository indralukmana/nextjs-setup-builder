export default function LocaleLoading() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Loading page">
      <div className="bg-muted/60 relative min-h-[calc(100svh-3.25rem)] animate-pulse" />
      <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <div className="bg-muted h-8 w-56 animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-muted h-28 animate-pulse rounded-lg" />
          <div className="bg-muted h-28 animate-pulse rounded-lg" />
          <div className="bg-muted h-28 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
}
