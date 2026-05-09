"use client";

import Image from "next/image";
import { useState } from "react";
import type {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { FieldLabel, type FieldLabelType } from "@/shared/components/ui/field-label";
import { cn } from "@/shared/utils/utils";

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
type InputValueState = "filled" | "unfilled";

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

export function Input({
  className,
  disabled,
  value,
  defaultValue,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;

  return (
    <InputShell
      disabled={disabled}
      state={disabled ? "disabled" : undefined}
      valueState={getValueState(value, defaultValue)}
      className={className}
    >
      <input
        type={inputType}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        className={inputControlClassName}
        {...props}
      />
      {isPasswordField ? (
        <InputSlot>
          <PasswordVisibilityButton
            isVisible={isPasswordVisible}
            onToggle={() => setIsPasswordVisible((isVisible) => !isVisible)}
          />
        </InputSlot>
      ) : null}
    </InputShell>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  labelHelpIcon?: ReactNode;
  showLabelHelpIcon?: boolean;
  labelType?: FieldLabelType;
  optionalLabel?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  state?: InputFieldState;
  fieldClassName?: string;
  inputClassName?: string;
};

export function InputField({
  id,
  label,
  error,
  helperText,
  labelHelpIcon,
  showLabelHelpIcon = false,
  labelType,
  leading,
  optionalLabel,
  trailing,
  state,
  className,
  fieldClassName,
  inputClassName,
  disabled,
  type,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType =
    isPasswordField && isPasswordVisible ? "text" : type;
  const resolvedTrailing =
    trailing ??
    (isPasswordField ? (
      <PasswordVisibilityButton
        isVisible={isPasswordVisible}
        onToggle={() => setIsPasswordVisible((isVisible) => !isVisible)}
      />
    ) : null);
  const resolvedState = getResolvedState({
    disabled,
    error,
    state,
    value: props.value,
    defaultValue: props.defaultValue,
  });
  const valueState = getValueState(props.value, props.defaultValue);
  const descriptionId = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;
  const resolvedLabelType = labelType ?? (props.required ? "required" : "none");

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <FieldLabel
        htmlFor={id}
        helpIcon={labelHelpIcon}
        optionalText={optionalLabel}
        showHelpIcon={showLabelHelpIcon}
        type={resolvedLabelType}
      >
        {label}
      </FieldLabel>
      <InputShell
        state={resolvedState}
        valueState={valueState}
        disabled={disabled}
        className={fieldClassName}
      >
        <InputSlot>{leading}</InputSlot>
        <input
          id={id}
          type={inputType}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(ariaDescribedBy, descriptionId)}
          className={cn(inputControlClassName, inputClassName)}
          {...props}
        />
        <InputSlot>{resolvedTrailing}</InputSlot>
      </InputShell>
      <FieldMessage
        id={descriptionId}
        error={error}
        helperText={helperText}
      />
    </div>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  labelHelpIcon?: ReactNode;
  showLabelHelpIcon?: boolean;
  labelType?: FieldLabelType;
  optionalLabel?: string;
  state?: InputFieldState;
};

export function TextareaField({
  id,
  label,
  error,
  helperText,
  labelHelpIcon,
  showLabelHelpIcon = false,
  labelType,
  optionalLabel,
  state,
  className,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaFieldProps) {
  const resolvedState = getResolvedState({
    disabled,
    error,
    state,
    value: props.value,
    defaultValue: props.defaultValue,
  });
  const valueState = getValueState(props.value, props.defaultValue);
  const tokens = getInputTokens(resolvedState, valueState);
  const descriptionId = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;
  const resolvedLabelType = labelType ?? (props.required ? "required" : "none");

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel
        htmlFor={id}
        helpIcon={labelHelpIcon}
        optionalText={optionalLabel}
        showHelpIcon={showLabelHelpIcon}
        type={resolvedLabelType}
      >
        {label}
      </FieldLabel>
      <textarea
        id={id}
        disabled={disabled}
        data-state={resolvedState}
        data-value-state={valueState}
        aria-invalid={Boolean(error)}
        aria-describedby={cn(ariaDescribedBy, descriptionId)}
        style={getInputStyle(tokens, resolvedState)}
        className={cn(
          "min-h-28 w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] p-4 text-base leading-6 outline-none transition-colors",
          "hover:border-[var(--input-hover-border)] focus:border-[var(--input-border)] focus:ring-2 focus:ring-ring",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      <FieldMessage
        id={descriptionId}
        error={error}
        helperText={helperText}
      />
    </div>
  );
}

function InputShell({
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
  const focusOutlineClassName =
    "before:border-ring";

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

function InputSlot({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <span className="relative z-[1] flex size-6 shrink-0 items-center justify-center [--stroke-0:currentColor] [&_svg]:size-6 [&_svg]:shrink-0">
      {children}
    </span>
  );
}

const inputControlClassName =
  "relative z-[1] min-w-0 flex-1 bg-transparent text-base leading-6 outline-none disabled:cursor-not-allowed";

function PasswordVisibilityButton({
  isVisible,
  onToggle,
}: {
  isVisible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex size-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label={isVisible ? "Hide password" : "Show password"}
      aria-pressed={isVisible}
    >
      <Image
        src={isVisible ? "/icons/auth-eye-slash.svg" : "/icons/auth-eye.svg"}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
    </button>
  );
}

function getResolvedState({
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

function normalizeState(state?: InputFieldState): InputFieldState {
  if (state === "focused") {
    return "focus";
  }

  return state ?? "default";
}

function getValueState(value: unknown, defaultValue?: unknown): InputValueState {
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

function getInputTokens(state: InputFieldState, valueState: InputValueState) {
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

function getInputStyle(
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

function FieldMessage({
  id,
  error,
  helperText,
}: {
  id?: string;
  error?: string;
  helperText?: string;
}) {
  if (error) {
    return (
      <p id={id} className="text-sm leading-5">
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p id={id} className="text-sm leading-5">
        {helperText}
      </p>
    );
  }

  return null;
}
