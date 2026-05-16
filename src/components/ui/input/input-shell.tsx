import type { ReactNode } from "react";
import {
  getInputStyle,
  getInputTokens,
  normalizeState,
  type InputFieldState,
  type InputValueState,
} from "./input.helpers";
import { cn } from "@/lib/utils/utils";

export function InputShell({
  children,
  className,
  disabled,
  state,
  valueState,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  state?: InputFieldState;
  valueState: InputValueState;
}) {
  const normalizedState = normalizeState(state);
  const tokens = getInputTokens(normalizedState, valueState);
  const focusOutlineClassName = "before:border-ring";

  return (
    <div
      data-state={normalizedState}
      data-value-state={valueState}
      style={getInputStyle(tokens, normalizedState)}
      className={cn(
        "relative flex h-14 w-full items-center gap-2 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] p-4 transition-colors",
        "before:pointer-events-none before:absolute before:-inset-[3px] before:rounded-[14px] before:border-2 before:border-transparent before:content-[''] hover:border-[var(--input-hover-border)] focus-within:border-[var(--input-border)] focus-within:before:border-ring",
        normalizedState === "focus" && focusOutlineClassName,
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      {children}
    </div>
  );
}
