"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/data/menu";
import { useCart } from "@/lib/context/CartContext";
import type { CartLine } from "@/lib/types/menu";

function CartItemRow({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-3 border-b border-cream-dark py-4 last:border-0">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
        <Image
          src={line.dish.image}
          alt={line.dish.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-sm font-semibold text-dark">
          {line.dish.name}
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-cream px-1 py-1">
            <button
              type="button"
              onClick={() => updateQuantity(line.dish.id, line.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-medium">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.dish.id, line.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-sm font-medium text-dark">
            {formatPrice(line.dish.price * line.quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(line.dish.id)}
        className="shrink-0 text-red-400 transition-colors hover:text-red-500"
        aria-label={`Remove ${line.dish.name}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
}

export function CartItemsList() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        Your cart is empty. Browse the menu to add items.
      </p>
    );
  }

  return (
    <div>
      {items.map((line) => (
        <CartItemRow key={line.dish.id} line={line} />
      ))}
    </div>
  );
}
