"use client";

import { useState } from "react";
import { MenuCategory, MenuItem } from "@/lib/types";
import { SizeDial } from "./SizeDial";
import { useCart } from "@/lib/cart-store";

export function MenuItemCard({ item, category }: { item: MenuItem; category: MenuCategory }) {
  const [selectedId, setSelectedId] = useState(item.variants[0].id);
  const [justAdded, setJustAdded] = useState(false);
  const addLine = useCart((s) => s.addLine);
  const open = useCart((s) => s.open);

  const variant = item.variants.find((v) => v.id === selectedId) ?? item.variants[0];

  function handleAdd() {
    addLine({
      lineId: `${item.id}::${variant.id}`,
      itemId: item.id,
      itemName: item.name,
      categoryName: category.name,
      size: variant.size,
      unitPrice: variant.price
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="bg-plate text-ink rounded-card p-5 shadow-plate">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-none tracking-wide">{item.name}</h3>
          {item.description && (
            <p className="mt-1.5 text-sm text-ink/60 leading-snug">{item.description}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <SizeDial variants={item.variants} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`mt-4 w-full rounded-pill py-3 font-display text-lg tracking-wide transition-colors ${
          justAdded ? "bg-gold-500 text-ink" : "bg-char-900 text-plate hover:bg-pepper-600"
        }`}
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
