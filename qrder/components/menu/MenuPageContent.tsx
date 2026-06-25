"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { DishCard } from "@/components/menu/DishCard";
import { FloatingCartBar } from "@/components/menu/FloatingCartBar";
import { RestaurantHero } from "@/components/menu/RestaurantHero";
import { SearchBar } from "@/components/menu/SearchBar";
import { DISHES } from "@/lib/data/menu";
import { useCart } from "@/lib/context/CartContext";
import type { MenuCategory } from "@/lib/types/menu";

export function MenuPageContent() {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<MenuCategory>("all");

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return DISHES.filter((dish) => {
      const matchesCategory =
        category === "all" || dish.category === category;
      const matchesSearch =
        !query || dish.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const specials = filteredDishes.filter((dish) => dish.isSpecial);
  const recommended = filteredDishes.filter((dish) => dish.isRecommended);

  return (
    <AppShell>
      <RestaurantHero />

      <div className="space-y-5 px-4 py-5">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter active={category} onChange={setCategory} />

        {specials.length > 0 ? (
          <section>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-serif text-xl font-bold text-dark">
                Today&apos;s Specials
              </h2>
              <span className="text-xs text-muted">Curated for you</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {specials.map((dish) => (
                <DishCard key={dish.id} dish={dish} onAdd={addItem} />
              ))}
            </div>
          </section>
        ) : null}

        {recommended.length > 0 ? (
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-dark">
              Recommended
            </h2>
            <div className="space-y-3">
              {recommended.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onAdd={addItem}
                  variant="row"
                />
              ))}
            </div>
          </section>
        ) : null}

        {filteredDishes.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            No dishes found. Try a different search or category.
          </p>
        ) : null}
      </div>

      <FloatingCartBar />
    </AppShell>
  );
}
