"use client";

import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

type BackButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children" | "onClick" | "type"
> & {
  fallbackHref?: string;
  label?: string;
  className?: string;
  children?: ReactNode;
};

export function BackButton({
  fallbackHref = "/",
  label = "Back",
  className,
  children,
  ...props
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleBack}
      className={cn(
        "inline-flex items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    >
      {children ?? label}
    </button>
  );
}
