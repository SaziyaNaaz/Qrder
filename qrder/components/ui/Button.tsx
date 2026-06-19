import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full cursor-pointer rounded-lg bg-brand py-4 text-xl font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-brand-dark hover:shadow-lg active:scale-[0.98] active:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand disabled:hover:shadow-md disabled:active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
