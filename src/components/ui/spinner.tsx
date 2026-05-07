import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-950",
        className,
      )}
      aria-label="Loading"
    />
  );
}
