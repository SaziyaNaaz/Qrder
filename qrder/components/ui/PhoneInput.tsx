"use client";

import type { InputHTMLAttributes } from "react";
import { sanitizeMobileInput } from "@/lib/validation/mobile";

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const NUMERIC_KEYS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const ALLOWED_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
]);

export function PhoneInput({
  id,
  label,
  value,
  onChange,
  error,
  className = "",
  ...props
}: PhoneInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(sanitizeMobileInput(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (ALLOWED_KEYS.has(event.key)) {
      return;
    }

    if (!NUMERIC_KEYS.has(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text");
    onChange(sanitizeMobileInput(pasted));
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-muted"
      >
        {label}
      </label>

      <div
        className={`flex overflow-hidden rounded-2xl border outline-none ${
          error
            ? "border-red-500 focus-within:border-red-500"
            : "border-cream-dark focus-within:border-brand"
        }`}
      >
        <span className="flex items-center border-r border-cream-dark bg-cream px-4 py-3 text-sm font-medium text-dark">
          +91
        </span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          aria-invalid={error ? true : undefined}
          className={`w-full bg-cream px-4 py-3 text-dark outline-none ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
