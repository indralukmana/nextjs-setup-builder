import type { LayerProps } from "@/components/setup-builder/preview-layers/types";

export function DeskElectric({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 420 180" className={className} style={style} aria-hidden fill="none">
      <rect x="20" y="48" width="380" height="22" rx="4" fill="#C4A574" />
      <rect x="20" y="48" width="380" height="6" rx="3" fill="#D9C19A" />
      <rect x="72" y="70" width="14" height="88" rx="3" fill="#6B7280" />
      <rect x="334" y="70" width="14" height="88" rx="3" fill="#6B7280" />
      <rect x="58" y="154" width="42" height="8" rx="2" fill="#4B5563" />
      <rect x="320" y="154" width="42" height="8" rx="2" fill="#4B5563" />
      <rect x="188" y="78" width="44" height="10" rx="5" fill="#374151" />
      <circle cx="210" cy="83" r="3" fill="#22C55E" />
    </svg>
  );
}

export function DeskMechanical({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 420 180" className={className} style={style} aria-hidden fill="none">
      <rect x="24" y="52" width="372" height="20" rx="3" fill="#A67C52" />
      <rect x="24" y="52" width="372" height="5" rx="2" fill="#C9A87C" />
      <path d="M90 72v78M330 72v78" stroke="#78716C" strokeWidth="10" strokeLinecap="round" />
      <path d="M78 150h44M298 150h44" stroke="#57534E" strokeWidth="8" strokeLinecap="round" />
      <path d="M96 100h28M296 100h28" stroke="#A8A29E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
