import { MENU, ORDERING_TERMS } from "@/lib/menu-data";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CartBar } from "@/components/CartBar";
import { CartDrawer } from "@/components/CartDrawer";

export default function MenuPage() {
  return (
    <main className="min-h-screen pb-28">
      {/* Hero */}
      <section className="relative overflow-hidden bg-char-950 bg-radial-fade px-6 pt-14 pb-10 text-center">
        <p className="font-display text-pepper-500 tracking-[0.3em] text-sm">WAWU MEALS</p>
        <h1 className="font-display text-5xl leading-[0.95] mt-3 tracking-wide">
          Spice Up Your
          <br />
          Taste Buds
        </h1>
        <p className="mt-4 text-plate/60 max-w-xs mx-auto">
          Home-style soups, rice and stews made fresh, sold by the bowl. Pick your size, place
          your order, pay by transfer.
        </p>
      </section>

      <CategoryNav categories={MENU} />

      <div className="px-4 space-y-10 mt-6">
        {MENU.map((category) => (
          <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-20">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="font-display text-3xl tracking-wide">{category.name}</h2>
            </div>
            {category.note && <p className="text-sm text-plate/50 px-1 mb-3">{category.note}</p>}
            <div className="space-y-4">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} category={category} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 px-6">
        <div className="dash-divider pt-6">
          <h3 className="font-display text-xl tracking-wide text-plate/80">
            Ordering Terms &amp; Handling
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-plate/50 list-disc pl-4">
            {ORDERING_TERMS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </footer>

      <CartBar />
      <CartDrawer />
    </main>
  );
}
