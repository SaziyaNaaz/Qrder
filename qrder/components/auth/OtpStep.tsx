"use client";

import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OtpInput } from "@/components/ui/OtpInput";
import { useOtpResend } from "@/hooks/useOtpResend";
import { resendOtp, verifyOtp } from "@/lib/auth/otp";
import { validateFullName } from "@/lib/validation/name";
import { validateOtp } from "@/lib/validation/otp";

type OtpStepProps = {
  mobile: string;
  onBack: () => void;
  onVerify: (otp: string, fullName: string) => Promise<void>;
  isLoading?: boolean;
};

export function OtpStep({ mobile, onBack, onVerify, isLoading = false }: OtpStepProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResendOtp = useCallback(async () => {
    try {
      await resendOtp(mobile);
      setOtp("");
      setOtpError(false);
      setResendMessage("OTP resent successfully");
    } catch {
      setResendMessage("Failed to resend OTP. Please try again.");
    }
  }, [mobile]);

  const { formattedTime, canResend, isResending, handleResend } = useOtpResend({
    onResend: handleResendOtp,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otpValidationError = validateOtp(otp);
    const nameValidationError = validateFullName(fullName);

    setOtpError(Boolean(otpValidationError));
    setNameError(Boolean(nameValidationError));

    if (otpValidationError || nameValidationError) {
      return;
    }

    setError(null);
    await onVerify(otp, fullName);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setOtpError(false);
    setResendMessage(null);
    setError(null);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    setNameError(false);
  };

  const handleResendClick = () => {
    setResendMessage(null);
    void handleResend();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <OtpInput
        id="otp"
        label="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
        error={otpError}
      />

      <div className="flex flex-col items-center gap-1 pt-1">
        <p className="text-sm text-muted">Didn&apos;t receive OTP?</p>

        {canResend ? (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={isResending}
            className="cursor-pointer rounded-lg px-2 py-1 text-sm font-semibold text-brand transition-all duration-200 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        ) : (
          <p className="text-sm font-medium text-muted">
            Resend OTP in {formattedTime}
          </p>
        )}

        {resendMessage ? (
          <p className="text-sm font-medium text-brand">{resendMessage}</p>
        ) : null}
      </div>

      <Input
        id="fullName"
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        autoComplete="name"
        value={fullName}
        onChange={handleNameChange}
        className={nameError ? "border-red-500 focus:border-red-500" : ""}
      />

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-4 rounded-full" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}