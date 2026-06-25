"use client";

import type { MenuCategory } from "@/lib/types/menu";
import { CATEGORIES } from "@/lib/data/menu";

type CategoryFilterProps = {
  active: MenuCategory;
  onChange: (category: MenuCategory) => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((category) => {
        const isActive = active === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand text-white"
                : "border border-cream-dark bg-card text-dark hover:border-brand"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
