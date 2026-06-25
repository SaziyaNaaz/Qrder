import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";

export default function OrdersPage() {
  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 text-brand">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h6" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-bold text-dark">Your Orders</h1>
        <p className="mt-2 max-w-xs text-sm text-muted">
          Order history will appear here once you place an order.
        </p>
        <Link href="/menu" className="mt-8 w-full max-w-xs">
          <Button type="button" className="rounded-full">
            Browse Menu
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
