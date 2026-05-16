import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

export const linkStates = [
  "default",
  "hover",
  "focus",
  "focused",
  "disabled",
] as const;

export type LinkState = (typeof linkStates)[number];
export type LinkColor = "foreground" | "blue";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, "onClick"> & {
  state?: LinkState;
  color?: LinkColor;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
};

const colorStyles = {
  foreground: "text-foreground",
  blue: "text-blue-600",
};

const stateStyles = {
  default: "",
  hover: "text-primary-hover",
  focus: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  focused: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  disabled: "pointer-events-none text-muted-foreground",
};

export function Link({
  className,
  state,
  color = "foreground",
  leading,
  trailing,
  disabled,
  children,
  tabIndex,
  "aria-disabled": ariaDisabled,
  href,
  ...props
}: LinkProps) {
  const resolvedState = disabled ? "disabled" : state ?? "default";
  const linkClassName = cn(
    "inline-flex items-center gap-3 rounded text-base leading-6 transition-colors",
    "hover:text-primary-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    colorStyles[color],
    stateStyles[resolvedState],
    className,
  );
  const content = (
    <>
      {leading ? (
        <span className="flex size-6 shrink-0 items-center justify-center text-current">
          {leading}
        </span>
      ) : null}
      <span>{children}</span>
      {trailing ? (
        <span className="flex size-6 shrink-0 items-center justify-center text-current">
          {trailing}
        </span>
      ) : null}
    </>
  );

  if (disabled) {
    return (
      <span
        data-state={resolvedState}
        aria-disabled="true"
        className={linkClassName}
      >
        {content}
      </span>
    );
  }

  return (
    <NextLink
      data-state={resolvedState}
      aria-disabled={ariaDisabled}
      tabIndex={tabIndex}
      href={href}
      className={linkClassName}
      {...props}
    >
      {content}
    </NextLink>
  );
}
