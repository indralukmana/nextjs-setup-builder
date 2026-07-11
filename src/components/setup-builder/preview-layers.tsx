import type { CSSProperties, ReactNode } from "react";

import type { CatalogProduct } from "@/types/catalog";

type LayerProps = {
  className?: string;
  style?: CSSProperties;
};

function DeskElectric({ className, style }: LayerProps) {
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

function DeskMechanical({ className, style }: LayerProps) {
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

function ChairErgonomic({ className, style }: LayerProps) {
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

function ChairTask({ className, style }: LayerProps) {
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

function Monitor24({ className, style }: LayerProps) {
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

function Monitor27({ className, style }: LayerProps) {
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

function Monitor34({ className, style }: LayerProps) {
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

function LampLed({ className, style }: LayerProps) {
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

function PlantDesk({ className, style }: LayerProps) {
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

function LaptopStand({ className, style }: LayerProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} style={style} aria-hidden fill="none">
      <rect x="18" y="8" width="84" height="52" rx="4" fill="#E5E7EB" />
      <rect x="24" y="14" width="72" height="40" rx="2" fill="#1E293B" />
      <path d="M30 60h60l10 12H20L30 60Z" fill="#9CA3AF" />
    </svg>
  );
}

function PeripheralsKit({ className, style }: LayerProps) {
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

const layerComponents: Record<string, (props: LayerProps) => ReactNode> = {
  "desk-electric": DeskElectric,
  "desk-mechanical": DeskMechanical,
  "chair-ergonomic": ChairErgonomic,
  "chair-task": ChairTask,
  "monitor-24": Monitor24,
  "monitor-27-4k": Monitor27,
  "monitor-34": Monitor34,
  "lamp-led": LampLed,
  "plant-desk": PlantDesk,
  "stand-laptop": LaptopStand,
  "kit-peripherals": PeripheralsKit,
};

export function ProductIllustration({
  productId,
  className,
  style,
}: {
  productId: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Component = layerComponents[productId];
  if (!Component) {
    return null;
  }
  return <Component className={className} style={style} />;
}

export type StageSlot = {
  product: CatalogProduct;
  className: string;
  zIndex: number;
};

/** Position products into a composed side-view workspace stage. */
export function buildStageSlots(products: CatalogProduct[]): StageSlot[] {
  const desk = products.find((p) => p.layer === "desk");
  const chair = products.find((p) => p.layer === "chair");
  const monitors = products.filter((p) => p.layer === "monitor");
  const lamp = products.find((p) => p.layer === "lamp");
  const plant = products.find((p) => p.layer === "plant");
  const peripherals = products.filter((p) => p.layer === "peripheral");

  const slots: StageSlot[] = [];

  if (desk) {
    slots.push({
      product: desk,
      zIndex: 10,
      className: "absolute bottom-[12%] left-[18%] w-[64%] max-w-[420px]",
    });
  }

  if (chair) {
    slots.push({
      product: chair,
      zIndex: 20,
      className: "absolute bottom-[6%] left-[2%] w-[22%] max-w-[150px]",
    });
  }

  monitors.forEach((monitor, index) => {
    slots.push({
      product: monitor,
      zIndex: 30 + index,
      className:
        monitor.id === "monitor-34"
          ? "absolute bottom-[38%] left-[28%] w-[44%] max-w-[280px]"
          : `absolute bottom-[40%] w-[24%] max-w-[160px] ${
              index === 0 && monitors.length > 1
                ? "left-[30%]"
                : monitors.length === 1
                  ? "left-[38%]"
                  : "left-[48%]"
            }`,
    });
  });

  if (lamp) {
    slots.push({
      product: lamp,
      zIndex: 35,
      className: "absolute bottom-[34%] right-[16%] w-[12%] max-w-[90px]",
    });
  }

  if (plant) {
    slots.push({
      product: plant,
      zIndex: 34,
      className: "absolute bottom-[30%] right-[6%] w-[12%] max-w-[90px]",
    });
  }

  peripherals.forEach((item, index) => {
    slots.push({
      product: item,
      zIndex: 40 + index,
      className:
        item.layer === "peripheral" && item.id === "stand-laptop"
          ? "absolute bottom-[34%] left-[22%] w-[16%] max-w-[120px]"
          : "absolute bottom-[28%] left-[42%] w-[20%] max-w-[150px]",
    });
  });

  return slots;
}
