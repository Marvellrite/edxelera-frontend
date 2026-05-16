import type { CSSProperties } from "react";

export const inputFieldStates = [
  "default",
  "hover",
  "focus",
  "focused",
  "filled",
  "error",
  "success",
  "disabled",
] as const;

export type InputFieldState = (typeof inputFieldStates)[number];
export type InputValueState = "filled" | "unfilled";

const inputTokens = {
  base: {
    background: "var(--color-input)",
    border: "var(--color-border)",
  },
  hover: {
    background: "var(--color-input)",
    border: "var(--color-foreground)",
  },
  focus: {
    background: "var(--color-input)",
    border: "var(--color-border)",
  },
  error: {
    background: "var(--color-input)",
    filledBackground: "var(--color-red-200)",
    border: "var(--color-destructive)",
  },
  success: {
    background: "var(--color-input)",
    filledBackground: "var(--color-green-200)",
    border: "var(--color-success)",
  },
  disabled: {
    background: "var(--color-muted)",
    border: "var(--color-border)",
  },
} as const;

export const inputControlClassName =
  "relative z-[1] min-w-0 flex-1 bg-transparent text-base leading-6 outline-none disabled:cursor-not-allowed";

export function getResolvedState({
  disabled,
  error,
  state,
  value,
  defaultValue,
}: {
  disabled?: boolean;
  error?: string;
  state?: InputFieldState;
  value?: unknown;
  defaultValue?: unknown;
}): InputFieldState {
  if (disabled) {
    return "disabled";
  }

  if (error) {
    return "error";
  }

  if (state && state !== "filled") {
    return state;
  }

  if (getValueState(value, defaultValue) === "filled") {
    return "filled";
  }

  return "default";
}

export function normalizeState(state?: InputFieldState): InputFieldState {
  if (state === "focused") {
    return "focus";
  }

  return state ?? "default";
}

export function getValueState(
  value: unknown,
  defaultValue?: unknown,
): InputValueState {
  const inputValue = value ?? defaultValue;

  if (typeof inputValue === "string") {
    return inputValue.length > 0 ? "filled" : "unfilled";
  }

  if (typeof inputValue === "number") {
    return "filled";
  }

  if (Array.isArray(inputValue)) {
    return inputValue.length > 0 ? "filled" : "unfilled";
  }

  return "unfilled";
}

export function getInputTokens(
  state: InputFieldState,
  valueState: InputValueState,
) {
  const normalizedState = normalizeState(state);

  if (normalizedState === "disabled") {
    return inputTokens.disabled;
  }

  if (normalizedState === "error") {
    return {
      ...inputTokens.error,
      background:
        valueState === "filled"
          ? inputTokens.error.filledBackground
          : inputTokens.error.background,
    };
  }

  if (normalizedState === "success") {
    return {
      ...inputTokens.success,
      background:
        valueState === "filled"
          ? inputTokens.success.filledBackground
          : inputTokens.success.background,
    };
  }

  if (normalizedState === "hover") {
    return {
      ...inputTokens.hover,
      background:
        valueState === "filled"
          ? inputTokens.disabled.background
          : inputTokens.hover.background,
    };
  }

  if (normalizedState === "focus") {
    return inputTokens.focus;
  }

  return inputTokens.base;
}

export function getInputStyle(
  tokens: ReturnType<typeof getInputTokens>,
  state: InputFieldState,
) {
  const hoverBorder =
    state === "default" || state === "filled" || state === "hover"
      ? inputTokens.hover.border
      : tokens.border;

  return {
    "--input-bg": tokens.background,
    "--input-border": tokens.border,
    "--input-hover-border": hoverBorder,
  } as CSSProperties;
}
