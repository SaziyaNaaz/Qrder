"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OtpStep } from "@/components/auth/OtpStep";
import { APP_NAME } from "@/lib/constants";
import { api } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"otp" | "done">("otp");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const phone = searchParams.get("phone") ?? "";

  // Validate phone is present
  useEffect(() => {
    if (!phone) {
      router.push("/");
    }
  }, [phone, router]);

  // Handle resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((c) => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (otp: string, fullName?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.verifyOtp(phone, otp);
      if (fullName && !response.is_profile_completed) {
        await api.completeProfile(fullName);
      }
      setStep("done");
      // Redirect after a brief moment
      setTimeout(() => router.push("/menu"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await api.sendOtp(phone);
      setResendCooldown(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  if (step === "done") {
    return (
      <div className="relative min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-dark">Verified!</h1>
          <p className="mt-2 text-sm text-muted">Redirecting to menu...</p>
        </div>
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

        <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-lg">
          <OtpStep
            mobile={phone}
            onVerify={handleVerify}
            onBack={handleBack}
            isLoading={isLoading}
          />

          {resendCooldown > 0 && (
            <div className="mt-4 text-center text-sm font-medium text-muted">
              Resend available in {resendCooldown}s
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}