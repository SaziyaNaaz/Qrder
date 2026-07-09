"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { RESTAURANT_NAME, TABLE_NUMBER } from "@/lib/constants";
import { useOrders } from "@/lib/api/hooks";
import { formatPrice } from "@/lib/data/menu";
import type { Order } from "@/lib/api/client";

export default function OrdersPage() {
  const { data: orders, error, isLoading, mutate } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-brand border-t-transparent" />
          <p className="mt-4 text-sm text-muted">Loading orders...</p>
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
          <h1 className="font-serif text-2xl font-bold text-dark">Failed to load orders</h1>
          <p className="mt-2 max-w-xs text-sm text-muted">{error.message}</p>
          <Button onClick={() => mutate()} className="mt-6 rounded-full">Retry</Button>
        </div>
      </AppShell>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <AppShell>
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 text-brand">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h6" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-dark">Your Orders</h1>
          <p className="mt-2 max-w-xs text-sm text-muted">Order history will appear here once you place an order.</p>
          <Link href="/menu" className="mt-8 w-full max-w-xs">
            <Button type="button" className="rounded-full">Browse Menu</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const statusColors: Record<Order["status"], string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-orange-100 text-orange-800",
    ready: "bg-green-100 text-green-800",
    delivered: "bg-slate-100 text-slate-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<Order["status"], string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready for Pickup",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <AppShell>
      <div className="px-4 py-6">
        <h1 className="text-center font-serif text-3xl font-bold text-dark">Your Orders</h1>
        <p className="mt-2 text-center text-sm text-muted">Table {TABLE_NUMBER} • {RESTAURANT_NAME}</p>

        <div className="mt-6 space-y-4">
          {orders.slice().reverse().map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggle={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
              statusColors={statusColors}
              statusLabels={statusLabels}
            />
          ))}
        </div>

        <div className="mt-8 w-full max-w-sm">
          <Link href="/menu" className="block text-center text-sm font-medium text-brand hover:underline">
            Browse menu
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  statusColors: Record<Order["status"], string>;
  statusLabels: Record<Order["status"], string>;
}

function OrderCard({ order, isExpanded, onToggle, statusColors, statusLabels }: OrderCardProps) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="rounded-3xl bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-dark">Order #{order.id.slice(-8).toUpperCase()}</p>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">{formattedDate}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="px-2 py-1"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide" : "View"} Details
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3 border-t border-cream-dark pt-4">
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-dark">{item.dish.name}</p>
                    <p className="text-xs text-muted">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium text-dark">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm border-t border-cream-dark pt-3">
            <span className="text-muted">Subtotal</span>
            <span className="font-medium text-dark">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Tax (9%)</span>
            <span className="font-medium text-dark">{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-dark border-t border-cream-dark pt-3">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>

          {order.specialInstructions && (
            <div className="rounded-xl bg-cream p-3 text-sm">
              <p className="font-medium text-dark">Special Instructions</p>
              <p className="mt-1 text-muted">{order.specialInstructions}</p>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted">
            <span>Table {order.tableNumber}</span>
            <span>{RESTAURANT_NAME}</span>
          </div>
        </div>
      )}
    </section>
  );
}