"use client";

import { formatPrice } from "@/lib/data/menu";
import { useCart } from "@/lib/context/CartContext";

export function BillSummary() {
  const { subtotal, tax, total } = useCart();

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between text-muted">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-muted">
        <span>GST &amp; Taxes</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className="border-t border-cream-dark pt-3">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-dark">
            Grand Total
          </span>
          <span className="font-serif text-xl font-bold text-dark">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
