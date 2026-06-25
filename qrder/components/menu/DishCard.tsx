"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/data/menu";
import type { Dish } from "@/lib/types/menu";

type DishCardProps = {
  dish: Dish;
  onAdd: (dish: Dish) => void;
  variant?: "card" | "row";
};

export function DishCard({ dish, onAdd, variant = "card" }: DishCardProps) {
  if (variant === "row") {
    return (
      <div className="flex gap-4 rounded-2xl bg-card p-3 shadow-sm">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-serif text-base font-semibold text-dark">
              {dish.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{formatPrice(dish.price)}</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onAdd(dish)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-lg font-medium text-white transition-transform active:scale-95"
              aria-label={`Add ${dish.name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-44 shrink-0 overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="relative h-36 w-full">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="176px"
        />
      </div>
      <div className="relative p-3">
        <h3 className="font-serif text-sm font-semibold leading-tight text-dark">
          {dish.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{formatPrice(dish.price)}</p>
        <button
          type="button"
          onClick={() => onAdd(dish)}
          className="absolute -top-5 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xl font-medium text-white shadow-md transition-transform active:scale-95"
          aria-label={`Add ${dish.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
