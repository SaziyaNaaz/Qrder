"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { DishCard } from "@/components/menu/DishCard";
import { FloatingCartBar } from "@/components/menu/FloatingCartBar";
import { RestaurantHero } from "@/components/menu/RestaurantHero";
import { SearchBar } from "@/components/menu/SearchBar";
import { useCart } from "@/lib/context/CartContext";
import { useRestaurant } from "@/lib/context/RestaurantContext";
import { useMenu } from "@/lib/api/hooks";
import type { MenuCategory } from "@/lib/types/menu";

export function MenuPageContent() {
  const { addItem } = useCart();
  const { restaurantCode } = useRestaurant();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<MenuCategory>("all");

  const { data: menuData, isLoading, error } = useMenu(restaurantCode ?? "");

  const dishes = useMemo(() => {
    if (!menuData?.categories) return [];
    return menuData.categories.flatMap((cat) =>
      cat.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image_url ?? "",
        category: cat.name.toLowerCase().replace(/\s+/g, ""),
        isSpecial: false,
        isRecommended: false,
        description: item.description,
        is_veg: item.is_veg,
        is_vegan: item.is_vegan,
        is_jain: item.is_jain,
        contains_egg: item.contains_egg,
        spice_level: item.spice_level,
        preparation_time: item.preparation_time ?? undefined,
      }))
    );
  }, [menuData]);

  const filteredDishes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        category === "all" || dish.category === category;
      const matchesSearch =
        !query || dish.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category, dishes]);

  const specials = filteredDishes.filter((dish) => dish.isSpecial);
  const recommended = filteredDishes.filter((dish) => dish.isRecommended);

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-brand border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 text-red-500">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-dark">Failed to load menu</h1>
          <p className="mt-2 max-w-xs text-sm text-muted">{error.message}</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <RestaurantHero restaurant={menuData?.restaurant} />

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