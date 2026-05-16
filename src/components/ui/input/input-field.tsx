"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import {
  getResolvedState,
  getValueState,
  inputControlClassName,
  inputFieldStates,
  type InputFieldState,
} from "./input.helpers";
import { FieldMessage } from "./field-message";
import { InputShell } from "./input-shell";
import { InputSlot } from "./input-slot";
import { PasswordVisibilityButton } from "./password-visibility-button";
import {
  FieldLabel,
  type FieldLabelType,
} from "@/components/ui/field-label";
import { cn } from "@/lib/utils/utils";

export { inputFieldStates };
export type { InputFieldState };

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
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
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;
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
