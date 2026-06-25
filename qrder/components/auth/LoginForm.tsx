"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { OtpStep } from "@/components/auth/OtpStep";
import { sendOtp } from "@/lib/auth/otp";
import {
  getInvalidFirstDigitError,
  validateMobileNumber,
} from "@/lib/validation/mobile";

type AuthStep = "login" | "otp";

export function LoginForm() {
  const [step, setStep] = useState<AuthStep>("login");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const validationError = validateMobileNumber(mobile);
    setError(validationError);

    if (validationError) {
      return;
    }

    void sendOtp(mobile);
    setStep("otp");
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

  const handleBackToLogin = () => {
    setStep("login");
    setError(null);
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-lg">
      <div key={step}>
        {step === "login" ? (
          <>
            <h2 className="mb-2 text-center font-serif text-3xl font-bold text-dark">
              Login
            </h2>
            <p className="mb-6 text-center text-sm text-muted">
              Enter your mobile number to continue
            </p>

            <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
              <PhoneInput
                id="mobile"
                label="Mobile Number"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={handleMobileChange}
                error={error ?? undefined}
              />

              <Button type="submit" className="mt-8 rounded-full">
                Login
              </Button>
            </form>
          </>
        ) : (
          <OtpStep mobile={mobile} onBack={handleBackToLogin} />
        )}
      </div>
    </div>
  );
}
