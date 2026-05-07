import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function RichTextEditor({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-40 w-full rounded-md border border-border bg-input text-foreground px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
