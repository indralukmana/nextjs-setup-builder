import type { LayerProps } from "@/components/setup-builder/preview-layers/types";

export function ChairErgonomic({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} style={style} aria-hidden fill="none">
      <path
        d="M42 28c0-10 16-18 38-18s38 8 38 18v78c0 8-12 14-38 14s-38-6-38-14V28Z"
        fill="#1F2937"
      />
      <path
        d="M48 36c2-6 14-10 32-10s30 4 32 10"
        stroke="#6EE7B7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="36" y="118" width="88" height="28" rx="10" fill="#111827" />
      <rect x="28" y="128" width="16" height="36" rx="6" fill="#374151" />
      <rect x="116" y="128" width="16" height="36" rx="6" fill="#374151" />
      <path d="M80 146v36" stroke="#6B7280" strokeWidth="8" strokeLinecap="round" />
      <circle cx="80" cy="190" r="18" stroke="#9CA3AF" strokeWidth="6" fill="#E5E7EB" />
      <circle cx="62" cy="204" r="7" fill="#6B7280" />
      <circle cx="98" cy="204" r="7" fill="#6B7280" />
      <circle cx="80" cy="210" r="7" fill="#6B7280" />
    </svg>
  );
}

export function ChairTask({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 140 200" className={className} style={style} aria-hidden fill="none">
      <rect x="34" y="24" width="72" height="70" rx="14" fill="#0F766E" />
      <rect x="28" y="96" width="84" height="26" rx="10" fill="#134E4A" />
      <path d="M70 122v34" stroke="#64748B" strokeWidth="7" strokeLinecap="round" />
      <circle cx="70" cy="166" r="16" fill="#CBD5E1" />
      <circle cx="54" cy="178" r="6" fill="#64748B" />
      <circle cx="86" cy="178" r="6" fill="#64748B" />
      <circle cx="70" cy="184" r="6" fill="#64748B" />
    </svg>
  );
}
