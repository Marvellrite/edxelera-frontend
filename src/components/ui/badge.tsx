import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}
