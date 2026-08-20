"use client";

import { MenuVariant } from "@/lib/types";
import { formatNaira } from "@/lib/cart-store";

// Ring diameters scale with the actual bowl size, smallest to largest —
// the dial itself communicates portion size, not just a label.
const RING_SCALE: Record<string, string> = {
  "1.5L": "2rem",
  "2.5L": "2.4rem",
  "3.5L": "2.8rem",
  "5L": "3.2rem",
  Standard: "2.4rem"
};

export function SizeDial({
  variants,
  selectedId,
  onSelect
}: {
  variants: MenuVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex items-end gap-3">
      {variants.map((v) => {
        const selected = v.id === selectedId;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            aria-pressed={selected}
            className="flex flex-col items-center gap-1.5 group"
          >
            <span
              className="size-dial"
              data-selected={selected}
              style={{ width: RING_SCALE[v.size] ?? "2.4rem" }}
            >
              {selected && <span className="w-1.5 h-1.5 rounded-full bg-plate" />}
            </span>
            <span
              className={`font-display text-sm tracking-wide ${
                selected ? "text-pepper-500" : "text-plate/60"
              }`}
            >
              {v.size}
            </span>
          </button>
        );
      })}
      <span className="ml-auto self-center font-display text-2xl text-gold-400 tabular-nums">
        {formatNaira(variants.find((v) => v.id === selectedId)?.price ?? variants[0].price)}
      </span>
    </div>
  );
}
