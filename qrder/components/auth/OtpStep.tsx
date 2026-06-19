"use client";

import { FormEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OtpInput } from "@/components/ui/OtpInput";
import { useOtpResend } from "@/hooks/useOtpResend";
import { resendOtp } from "@/lib/auth/otp";
import { validateFullName } from "@/lib/validation/name";
import { validateOtp } from "@/lib/validation/otp";

type OtpStepProps = {
  mobile: string;
  onBack: () => void;
};

export function OtpStep({ mobile, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleResendOtp = useCallback(async () => {
    await resendOtp(mobile);
    setOtp("");
    setOtpError(false);
    setResendMessage("OTP resent successfully");
  }, [mobile]);

  const { formattedTime, canResend, isResending, handleResend } = useOtpResend({
    onResend: handleResendOtp,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otpValidationError = validateOtp(otp);
    const nameValidationError = validateFullName(fullName);

    setOtpError(Boolean(otpValidationError));
    setNameError(Boolean(nameValidationError));

    if (otpValidationError || nameValidationError) {
      return;
    }

    // TODO: verify OTP and complete login
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setOtpError(false);
    setResendMessage(null);
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
    <>
      <h2 className="mb-2 text-center text-4xl font-semibold">Verify OTP</h2>
      <p className="mb-6 text-center text-muted">OTP sent to +91 {mobile}</p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <OtpInput
          id="otp"
          label="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          error={otpError}
        />

        <div className="flex flex-col items-center gap-1 pt-1">
          <p className="text-base text-muted">Didn&apos;t receive OTP?</p>

          {canResend ? (
            <button
              type="button"
              onClick={handleResendClick}
              disabled={isResending}
              className="cursor-pointer rounded-lg px-2 py-1 text-base font-semibold text-brand transition-all duration-200 ease-in-out hover:bg-brand/10 hover:underline active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:no-underline disabled:active:scale-100"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="text-base font-medium text-muted">
              Resend OTP in {formattedTime}
            </p>
          )}

          {resendMessage ? (
            <p className="text-base font-medium text-brand">{resendMessage}</p>
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

        <Button type="submit" className="mt-6">
          Verify
        </Button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 w-full cursor-pointer rounded-lg py-2 text-center text-base font-medium text-brand transition-all duration-200 ease-in-out hover:bg-brand/10 hover:underline active:scale-[0.98]"
      >
        Change mobile number
      </button>
    </>
  );
}
