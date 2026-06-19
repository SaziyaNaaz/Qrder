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

    if (!validationError) {
      void sendOtp(mobile);
    }

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
    <div className="relative z-20 w-full max-w-md rounded-2xl p-8 shadow-xl">
      <div key={step}>
        {step === "login" ? (
          <>
            <h2 className="mb-6 text-center text-4xl font-semibold">Login</h2>

            <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
              <PhoneInput
                id="mobile"
                label="Mobile Number"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={handleMobileChange}
                error={error ?? undefined}
              />

              <Button type="submit" className="mt-14 cursor-pointer">
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
