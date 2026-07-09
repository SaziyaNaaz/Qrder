"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const redirectTo = searchParams.get("redirect") ?? "/menu";
  const fromQR = searchParams.get("phone");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-card p-8 shadow-lg animate-pulse">
            <div className="h-8 bg-cream rounded w-3/4 mx-auto mb-6" />
            <div className="h-6 bg-cream rounded w-full mb-4" />
            <div className="h-6 bg-cream rounded w-full mb-4" />
            <div className="h-4 bg-cream rounded w-full mb-2" />
            <div className="h-4 bg-cream rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = async (phoneNumber: string) => {
    router.push(`/verify?phone=${encodeURIComponent(phoneNumber)}&redirect=${encodeURIComponent(redirectTo)}`);
  };

  return (
    <div className="relative min-h-screen bg-cream">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ebe4d8_0%,_transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        {/* Back link */}
        <div className="absolute left-4 top-4 z-10">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-brand hover:underline transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to {APP_NAME}
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="QRder Home">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand">
                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold text-dark">{APP_NAME}</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-dark">Welcome back</h1>
            <p className="mt-2 text-muted">Enter your mobile number to continue</p>
          </div>

          {/* Login Form */}
          <div className="rounded-3xl bg-card p-8 shadow-lg">
            <LoginForm
              onLogin={handleLogin}
              isLoading={false}
            />
          </div>

          {/* Info note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              By continuing, you agree to our{" "}
              <a href="#" className="font-medium text-brand hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="font-medium text-brand hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}