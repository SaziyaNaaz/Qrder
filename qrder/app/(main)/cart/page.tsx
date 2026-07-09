"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { BillSummary } from "@/components/cart/BillSummary";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { Button } from "@/components/ui/Button";
import { RESTAURANT_NAME, TABLE_NUMBER } from "@/lib/constants";
import { useCart } from "@/lib/context/CartContext";
import { useRestaurant } from "@/lib/context/RestaurantContext";
import { api, isAuthenticated } from "@/lib/api";
import { LoginModal } from "@/components/auth/LoginModal";
import type { CreateOrderRequest } from "@/lib/api/types";

export default function CartPage() {
  const router = useRouter();
  const { items, specialInstructions, setSpecialInstructions, clearCart } =
    useCart();
  const { restaurantCode, tableCode } = useRestaurant();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<CreateOrderRequest | null>(null);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    if (!restaurantCode) {
      setError("Restaurant information not found. Please scan the QR code again.");
      return;
    }

    const orderRequest: CreateOrderRequest = {
      restaurant_code: restaurantCode,
      table_code: tableCode,
      items: items.map((line) => ({
        menu_item_id: line.menuItemId ?? line.dish.id,
        quantity: line.quantity,
      })),
      customer_note: specialInstructions || undefined,
    };

    // Check if user is authenticated
    if (!isAuthenticated()) {
      setPendingOrder(orderRequest);
      setShowLoginModal(true);
      return;
    }

    executeOrder(orderRequest);
  };

  const executeOrder = async (orderRequest: CreateOrderRequest) => {
    setIsPlacingOrder(true);
    setError(null);

    try {
      await api.createOrder(orderRequest);
      clearCart();
      router.push("/order-placed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleLoginSuccess = () => {
    if (pendingOrder) {
      executeOrder(pendingOrder);
      setPendingOrder(null);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setPendingOrder(null);
  };

  return (
    <AppShell>
      <div className="px-4 py-6">
        <h1 className="text-center font-serif text-3xl font-bold text-dark">
          Your Cart
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Table {tableCode ?? TABLE_NUMBER} &bull; {RESTAURANT_NAME}
        </p>

        <div className="mt-6 space-y-4">
          <section className="rounded-3xl bg-card p-5 shadow-sm">
            <h2 className="mb-1 font-serif text-lg font-semibold text-dark">
              Order Items
            </h2>
            <CartItemsList />
          </section>

          <section className="rounded-3xl bg-card p-5 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-semibold text-dark">
              Special Instructions
            </h2>
            <textarea
              value={specialInstructions}
              onChange={(event) => setSpecialInstructions(event.target.value)}
              placeholder="Any special requests or allergies? Let us know..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-cream-dark bg-cream px-4 py-3 text-sm text-dark outline-none placeholder:text-muted focus:border-brand"
            />
          </section>

          <section className="rounded-3xl bg-card p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-lg font-semibold text-dark">
              Bill Summary
            </h2>
            <BillSummary />
          </section>

          <Button
            type="button"
            onClick={handlePlaceOrder}
            disabled={items.length === 0 || isPlacingOrder}
            className="rounded-full"
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </Button>

          {error && (
            <p className="text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {items.length === 0 ? (
            <Link
              href="/menu"
              className="block text-center text-sm font-medium text-brand hover:underline"
            >
              Browse menu
            </Link>
          ) : null}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </AppShell>
  );
}