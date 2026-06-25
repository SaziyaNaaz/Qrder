import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ id, label, className = "", ...props }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-2xl border border-cream-dark bg-cream px-4 py-3 text-dark outline-none focus:border-brand ${className}`}
        {...props}
      />
    </div>
  );
}
