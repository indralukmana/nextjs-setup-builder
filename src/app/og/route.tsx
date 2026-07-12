import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "linear-gradient(165deg, #eaf3e4 0%, #f3ebe0 42%, #d9c9a8 100%)",
        color: "#1f3d2f",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        monis
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 48, fontWeight: 600, maxWidth: 900 }}>
          Build your Bali workspace
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#2a4636", maxWidth: 820 }}>
          Compose a desk, chair, and gear visually — then rent it delivered across Bali.
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
