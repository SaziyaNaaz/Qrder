"use client";

import { useEffect, useRef } from "react";
import { OTP_LENGTH, sanitizeOtpInput } from "@/lib/validation/otp";

type OtpInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export function OtpInput({ id, label, value, onChange, error }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateValue = (nextValue: string) => {
    onChange(sanitizeOtpInput(nextValue));
  };

  const handleChange = (index: number, digit: string) => {
    const sanitized = digit.replace(/\D/g, "");
    const nextDigits = [...digits];

    if (!sanitized) {
      nextDigits[index] = "";
      updateValue(nextDigits.join(""));
      return;
    }

    nextDigits[index] = sanitized.slice(-1);
    updateValue(nextDigits.join(""));

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text");
    updateValue(pasted);
    inputRefs.current[Math.min(sanitizeOtpInput(pasted).length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div>
      <label className="mb-2 block text-lg font-medium text-muted">{label}</label>

      <div
        id={id}
        className="flex justify-between gap-2"
        role="group"
        aria-label={label}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            aria-invalid={error ? true : undefined}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            onFocus={(event) => event.target.select()}
            className={`h-14 w-full max-w-12 rounded-lg border text-center text-2xl font-semibold outline-none ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-brand"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
