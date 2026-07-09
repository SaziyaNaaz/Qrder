"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { APP_NAME } from "@/lib/constants";
import { useRestaurant } from "@/lib/context/RestaurantContext";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setRestaurantInfo, restaurantCode } = useRestaurant();

  useEffect(() => {
    const code = searchParams.get("code");
    const table = searchParams.get("table");

    if (code) {
      setRestaurantInfo(code, table ?? undefined);
      router.replace("/menu");
    }
  }, [searchParams, setRestaurantInfo, router]);

  // Show loading while checking for QR code params
  if (searchParams.has("code") || searchParams.has("table")) {
    return (
      <div className="relative min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ebe4d8_0%,_transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Welcome to
          </p>
          <h1 className="mt-1 font-serif text-4xl font-bold text-dark">
            {APP_NAME}
          </h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}