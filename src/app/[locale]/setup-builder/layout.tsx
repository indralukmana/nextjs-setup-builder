import type { ReactNode } from "react";

/**
 * Keep the builder page viewport-locked even before client hydration.
 * Clears via `BuilderViewport` on leave so other routes can scroll again.
 */
export default function SetupBuilderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`html,body{height:100dvh;overflow:hidden}[data-app-shell]{height:100%;min-height:0}`}</style>
      {children}
    </>
  );
}
