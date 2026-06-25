"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { RESTAURANT_NAME, TABLE_NUMBER } from "@/lib/constants";

function generateOrderId() {
  return `ORD-${Math.floor(20000 + Math.random() * 10000)}`;
}

export default function OrderPlacedPage() {
  const [orderId] = useState(generateOrderId);

  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center px-4 py-10 text-center">
        <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-brand/20" />
          <span className="absolute inset-2 rounded-full border border-brand/30" />
          <span className="absolute inset-4 rounded-full border border-brand/40" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-dark">Order Placed!</h1>
        <p className="mt-2 text-sm italic text-muted">
          Your dining experience is being prepared
        </p>

        <div className="mt-8 w-full max-w-sm rounded-3xl bg-card p-5 text-left shadow-sm">
          <p className="font-semibold text-dark">Order #{orderId}</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Estimated Time
              </div>
              <span className="font-semibold text-brand">25–30 mins</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Table
              </div>
              <span className="font-medium text-dark">
                Table {TABLE_NUMBER} • {RESTAURANT_NAME}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-sm space-y-3">
          <Button type="button" className="rounded-full">
            Track My Order
          </Button>
          <Link href="/orders">
            <button
              type="button"
              className="w-full rounded-full border border-cream-dark bg-card py-4 font-serif text-lg font-semibold text-brand shadow-sm transition-transform active:scale-[0.98]"
            >
              View All Orders
            </button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
