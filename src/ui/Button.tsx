import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "gradient" | "institutional";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  gradient:
    "bg-gradient-to-r from-brand-from to-brand-to text-white hover:opacity-90 active:opacity-80",
  institutional: "bg-brand text-white hover:bg-link-hover active:opacity-80",
};

export function buttonClassName(variant: ButtonVariant = "gradient", className = "") {
  return `inline-flex min-h-12 items-center justify-center rounded-pill px-6 font-heading text-base font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`;
}

export function Button({
  variant = "gradient",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, className)} {...props} />
  );
}
