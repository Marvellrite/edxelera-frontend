import type { ReactNode, TextareaHTMLAttributes } from "react";
import {
  getInputStyle,
  getInputTokens,
  getResolvedState,
  getValueState,
  type InputFieldState,
} from "./input.helpers";
import { FieldMessage } from "./field-message";
import {
  FieldLabel,
  type FieldLabelType,
} from "@/shared/components/ui/field-label";
import { cn } from "@/shared/utils/utils";

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
