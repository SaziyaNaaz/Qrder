"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { api, isAuthenticated } from "@/lib/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (phoneNumber: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.sendOtp(phoneNumber);
      setStep("otp"); // Switch to OTP step after sending
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (phoneNumber: string, otp: string, fullName?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.verifyOtp(phoneNumber, otp);
      if (fullName && !response.is_profile_completed) {
        await api.completeProfile(fullName);
      }
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      await api.sendOtp(phoneNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // We need state to manage auth steps
  const [step, setStep] = useState<"login" | "otp">("login");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");

  // Using a simple approach without separate components
  const content = step === "login" ? (
    <>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-dark">Login</h2>
      <p className="mb-6 text-center text-sm text-muted">Enter your mobile number to continue</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="tel"
          id="mobile"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full rounded-2xl border border-cream-dark bg-cream px-4 py-3 text-sm text-dark outline-none placeholder:text-muted focus:border-brand"
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="button"
          onClick={() => handleLogin(mobile)}
          disabled={isLoading || !mobile}
          className="w-full mt-8 rounded-full bg-brand py-3 text-base font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </>
  ) : (
    <>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-dark">Verify OTP</h2>
      <p className="mb-6 text-center text-sm text-muted">OTP sent to +91 {mobile}</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-3">
          {["1", "2", "3", "4", "5", "6"].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={otp[i] || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  const newOtp = otp.split("");
                  newOtp[i] = val;
                  setOtp(newOtp.join(""));
                  if (val && i < 5) {
                    (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) {
                  (document.getElementById(`otp-${i - 1}`) as HTMLInputElement)?.focus();
                }
              }}
              id={`otp-${i}`}
              className="flex-1 h-12 w-12 rounded-xl border border-cream-dark bg-cream text-center text-2xl font-bold text-dark outline-none focus:border-brand"
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 pt-1">
          <p className="text-sm text-muted">Didn't receive OTP?</p>
          <button
            type="button"
            onClick={() => handleResendOtp(mobile)}
            disabled={isLoading}
            className="text-sm font-semibold text-brand hover:underline disabled:opacity-50"
          >
            Resend
          </button>
        </div>

        <input
          type="text"
          id="fullName"
          placeholder="Full Name (required for new users)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-2xl border border-cream-dark bg-cream px-4 py-3 text-sm text-dark outline-none placeholder:text-muted focus:border-brand"
        />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="button"
          onClick={() => handleVerifyOtp(mobile, otp, fullName || undefined)}
          disabled={isLoading || otp.length !== 6}
          className="w-full mt-4 rounded-full bg-brand py-3 text-base font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setStep("login");
          setOtp("");
          setFullName("");
          setError(null);
        }}
        className="mt-4 w-full text-center text-sm font-medium text-brand hover:underline"
      >
        Change mobile number
      </button>
    </>
  );

  return createPortal(
    <Fragment>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-3xl bg-card p-6 shadow-xl animate-in slide-in-from-top-4 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:bg-cream hover:text-dark transition-colors"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {content}
      </div>
    </Fragment>,
    document.body
  );
}