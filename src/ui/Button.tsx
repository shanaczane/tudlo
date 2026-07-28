import { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "outline-brand"
  | "danger"
  | "danger-outline"
  | "danger-soft"
  | "warning";

export type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-link-hover",
  outline: "bg-surface border border-border text-ink hover:bg-background",
  "outline-brand": "bg-surface border border-brand text-brand hover:bg-tint",
  danger: "bg-danger text-white hover:opacity-90",
  "danger-outline":
    "bg-surface border border-border text-danger hover:bg-danger-bg",
  "danger-soft": "bg-danger-bg text-danger hover:opacity-90",
  warning: "bg-warning text-warning-ink hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-base",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "lg",
  className = "",
) {
  return `inline-flex items-center justify-center gap-2 rounded-btn font-heading font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, size, className)} {...props} />
  );
}
