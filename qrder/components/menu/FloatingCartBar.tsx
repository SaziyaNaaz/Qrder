"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/data/menu";
import { useCart } from "@/lib/context/CartContext";

export function FloatingCartBar() {
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="fixed bottom-20 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl bg-card px-5 py-3.5 shadow-lg transition-transform active:scale-[0.98]"
    >
      <span className="text-sm font-medium text-dark">
        {itemCount} {itemCount === 1 ? "Item" : "Items"} • {formatPrice(subtotal)}
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}
