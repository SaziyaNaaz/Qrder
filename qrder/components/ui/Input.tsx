import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ id, label, className = "", ...props }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-lg font-medium text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-brand ${className}`}
        {...props}
      />
    </div>
  );
}
