import type { LayerProps } from "@/components/setup-builder/preview-layers/types";

export function LampLed({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 90 140" className={className} style={style} aria-hidden fill="none">
      <ellipse cx="45" cy="128" rx="28" ry="8" fill="#78716C" />
      <path d="M45 120V58" stroke="#A8A29E" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M45 58c-18-2-30-14-28-28 14 2 28 10 36 24"
        stroke="#D6D3D1"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M28 24h40l-6 18H34L28 24Z" fill="#FBBF24" />
      <ellipse cx="48" cy="24" rx="22" ry="8" fill="#FDE68A" opacity="0.7" />
    </svg>
  );
}

export function PlantDesk({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 100 130" className={className} style={style} aria-hidden fill="none">
      <path d="M28 118h44l-6-34H34l-6 34Z" fill="#B45309" />
      <path d="M50 84c-18-22-28-40-10-62 8 18 18 34 22 52" fill="#15803D" />
      <path d="M50 84c18-20 30-38 12-60-6 18-14 34-20 50" fill="#22C55E" />
      <path d="M50 84c0-28 8-48 24-64-4 22-12 42-24 64Z" fill="#4ADE80" />
      <circle cx="50" cy="78" r="4" fill="#166534" />
    </svg>
  );
}

export function LaptopStand({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} style={style} aria-hidden fill="none">
      <rect x="18" y="8" width="84" height="52" rx="4" fill="#E5E7EB" />
      <rect x="24" y="14" width="72" height="40" rx="2" fill="#1E293B" />
      <path d="M30 60h60l10 12H20L30 60Z" fill="#9CA3AF" />
    </svg>
  );
}

export function PeripheralsKit({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 160 70" className={className} style={style} aria-hidden fill="none">
      <rect x="8" y="28" width="96" height="28" rx="6" fill="#1F2937" />
      <rect x="16" y="34" width="10" height="8" rx="2" fill="#9CA3AF" />
      <rect x="30" y="34" width="10" height="8" rx="2" fill="#9CA3AF" />
      <rect x="44" y="34" width="10" height="8" rx="2" fill="#9CA3AF" />
      <rect x="58" y="34" width="18" height="8" rx="2" fill="#6B7280" />
      <path d="M124 20c14 0 24 8 24 20s-10 20-24 20-24-8-24-20 10-20 24-20Z" fill="#111827" />
      <circle cx="124" cy="40" r="6" fill="#4B5563" />
    </svg>
  );
}

export function WebcamHd({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={style} aria-hidden fill="none">
      <rect x="18" y="14" width="44" height="28" rx="8" fill="#1F2937" />
      <circle cx="40" cy="28" r="10" fill="#0F172A" />
      <circle cx="40" cy="28" r="5" fill="#38BDF8" />
      <path d="M32 42h16l4 8H28l4-8Z" fill="#334155" />
    </svg>
  );
}

export function WhiteboardGlass({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden fill="none">
      <rect x="10" y="8" width="100" height="72" rx="4" fill="#F8FAFC" stroke="#94A3B8" />
      <path
        d="M24 28h52M24 42h40M24 56h46"
        stroke="#64748B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="48" y="84" width="24" height="8" rx="2" fill="#78716C" />
    </svg>
  );
}

export function PowerStrip({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 140 40" className={className} style={style} aria-hidden fill="none">
      <rect x="8" y="10" width="124" height="20" rx="6" fill="#334155" />
      <rect x="20" y="15" width="14" height="10" rx="2" fill="#94A3B8" />
      <rect x="42" y="15" width="14" height="10" rx="2" fill="#94A3B8" />
      <rect x="64" y="15" width="14" height="10" rx="2" fill="#94A3B8" />
      <rect x="86" y="15" width="14" height="10" rx="2" fill="#94A3B8" />
      <circle cx="118" cy="20" r="4" fill="#22C55E" />
    </svg>
  );
}
