export function WorkspaceStageBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,252,245,0.85),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,transparent,#c4b193)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] right-[10%] h-24 w-24 rounded-full bg-[#fde68a]/50 blur-2xl"
      />
    </>
  );
}
