"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { api } from "@/lib/api";
import {
  getInvalidFirstDigitError,
  validateMobileNumber,
} from "@/lib/validation/mobile";

interface LoginFormProps {
  onLogin?: (phoneNumber: string) => Promise<void>;
  onClose?: () => void;
  isLoading?: boolean;
}

export function LoginForm({ onLogin, onClose, isLoading = false }: LoginFormProps) {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const validationError = validateMobileNumber(mobile);
    setError(validationError);

    if (validationError) {
      return;
    }

    // If onLogin is provided (e.g., from LoginModal), use it
    if (onLogin) {
      await onLogin(mobile);
      return;
    }

    // Otherwise, handle login directly (standalone usage on landing page)
    setError(null);
    try {
      await api.sendOtp(mobile);
      router.push(`/verify?phone=${encodeURIComponent(mobile)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP. Please try again.");
    }
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const handleMobileChange = (value: string) => {
    setMobile(value);

    const validationError = validateMobileNumber(value);

    if (validationError === null) {
      setError(null);
      return;
    }

    const firstDigitError = getInvalidFirstDigitError(value);
    if (firstDigitError) {
      setError(firstDigitError);
      return;
    }

    setError(null);
  };

  return (
    <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
      <PhoneInput
        id="mobile"
        label="Mobile Number"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={handleMobileChange}
        error={error ?? undefined}
        disabled={isLoading}
      />

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-8 rounded-full" disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </Button>
    </form>
  );
}