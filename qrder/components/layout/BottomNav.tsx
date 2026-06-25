"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  showBadge?: boolean;
};

function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 10h16M4 14h16M8 6v12M16 6v12" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems: NavItem[] = [
    {
      href: "/menu",
      label: "Menu",
      icon: <MenuIcon active={pathname.startsWith("/menu")} />,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <OrdersIcon />,
    },
    {
      href: "/cart",
      label: "Cart",
      icon: <CartIcon />,
      showBadge: true,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-dark bg-card px-6 pb-safe pt-2 shadow-[0_-4px_20px_rgba(45,41,38,0.06)]">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-brand" : "text-muted"
              }`}
            >
              <span className="relative">
                {item.icon}
                {item.showBadge && itemCount > 0 ? (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                ) : null}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
