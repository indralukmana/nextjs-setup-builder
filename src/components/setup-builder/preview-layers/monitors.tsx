import type { LayerProps } from "@/components/setup-builder/preview-layers/types";

export function Monitor24({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 140 110" className={className} style={style} aria-hidden fill="none">
      <rect x="12" y="8" width="116" height="74" rx="6" fill="#111827" />
      <rect x="18" y="14" width="104" height="58" rx="3" fill="#38BDF8" />
      <rect x="18" y="14" width="104" height="58" rx="3" fill="url(#grad-m24)" opacity="0.35" />
      <rect x="62" y="82" width="16" height="14" fill="#374151" />
      <rect x="48" y="96" width="44" height="6" rx="2" fill="#4B5563" />
      <defs>
        <linearGradient id="grad-m24" x1="18" y1="14" x2="122" y2="72">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Monitor27({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 160 120" className={className} style={style} aria-hidden fill="none">
      <rect x="10" y="6" width="140" height="84" rx="7" fill="#0F172A" />
      <rect x="16" y="12" width="128" height="68" rx="3" fill="#A78BFA" />
      <rect x="16" y="12" width="128" height="68" rx="3" fill="url(#grad-m27)" opacity="0.4" />
      <rect x="72" y="90" width="16" height="16" fill="#334155" />
      <rect x="54" y="106" width="52" height="7" rx="2" fill="#475569" />
      <defs>
        <linearGradient id="grad-m27" x1="16" y1="12" x2="144" y2="80">
          <stop stopColor="#FDF4FF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Monitor34({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 220 110" className={className} style={style} aria-hidden fill="none">
      <path d="M12 18c18-10 178-10 196 0v58c-18 10-178 10-196 0V18Z" fill="#020617" />
      <path d="M22 24c16-8 160-8 176 0v46c-16 8-160 8-176 0V24Z" fill="#22D3EE" />
      <path
        d="M22 24c16-8 160-8 176 0v46c-16 8-160 8-176 0V24Z"
        fill="url(#grad-m34)"
        opacity="0.45"
      />
      <rect x="102" y="84" width="16" height="14" fill="#334155" />
      <rect x="84" y="98" width="52" height="6" rx="2" fill="#475569" />
      <defs>
        <linearGradient id="grad-m34" x1="22" y1="24" x2="198" y2="70">
          <stop stopColor="#ECFEFF" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
