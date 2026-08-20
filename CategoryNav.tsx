"use client";

import { MenuCategory } from "@/lib/types";

export function CategoryNav({ categories }: { categories: MenuCategory[] }) {
  function scrollTo(id: string) {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-0 z-30 bg-char-900/95 backdrop-blur border-b border-char-700">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => scrollTo(c.id)}
            className="shrink-0 rounded-pill border border-char-700 px-4 py-1.5 text-sm font-display tracking-wide text-plate/80 hover:border-pepper-500 hover:text-pepper-500 transition-colors"
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
