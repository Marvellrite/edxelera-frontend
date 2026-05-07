import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonStates = [
  "default",
  "hover",
  "focused",
  "disabled",
  "loading",
] as const;

export type ButtonState = (typeof buttonStates)[number];
export type ButtonVariant = "primary" | "secondary" | "ghost" | "social";
export type ButtonSize = "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  fullWidth?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  isLoading?: boolean;
};

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  ghost: "hover:bg-muted",
  social: "bg-muted text-foreground hover:ring-1 ring-border ",
};

const sizes = {
  md: "h-10 rounded-md px-4 text-sm font-medium",
  lg: "h-14 rounded-xl px-6 py-4 text-base font-semibold leading-6",
  icon: "size-16 rounded-full p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "lg",
  state,
  fullWidth,
  leading,
  trailing,
  isLoading,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const resolvedState = disabled
    ? "disabled"
    : isLoading
      ? "loading"
      : state ?? "default";

  return (
    <button
      type={type}
      data-state={resolvedState}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {isLoading ? <SpinnerDot /> : leading}
      {children}
      {trailing}
    </button>
  );
}

function SpinnerDot() {
  return (
    <span
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}
