"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils/utils";

export const checkboxStates = [
  "default",
  "hover",
  "focus",
  "disabled",
  "error",
] as const;

export type CheckboxState = (typeof checkboxStates)[number];

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children?: ReactNode;
  label?: ReactNode;
  error?: boolean;
  indeterminate?: boolean;
  state?: CheckboxState;
  inputClassName?: string;
  indicatorClassName?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      children,
      inputClassName,
      indicatorClassName,
      label,
      error,
      indeterminate = false,
      disabled,
      state,
      checked,
      defaultChecked,
      "aria-invalid": ariaInvalid,
      ...props
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const resolvedState = disabled
      ? "disabled"
      : error || state === "error"
        ? "error"
        : state ?? "default";

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    function setInputRef(node: HTMLInputElement | null) {
      inputRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
        return;
      }

      if (forwardedRef) {
        forwardedRef.current = node;
      }
    }

    return (
      <label
        data-state={resolvedState}
        data-indeterminate={indeterminate ? "true" : undefined}
        className={cn(
          "group/checkbox inline-flex items-center gap-2 text-base leading-6 text-foreground",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={setInputRef}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-checked={indeterminate ? "mixed" : undefined}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
          className={cn("peer sr-only", inputClassName)}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative flex size-6 shrink-0 items-center justify-center rounded border-2 transition-colors",
            "border-neutral-300 bg-card text-primary-foreground",
            "group-hover/checkbox:border-primary-hover group-hover/checkbox:bg-blue-200",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            "group-data-[state=hover]/checkbox:border-primary-hover group-data-[state=hover]/checkbox:bg-blue-200",
            "group-data-[state=focus]/checkbox:outline group-data-[state=focus]/checkbox:outline-2 group-data-[state=focus]/checkbox:outline-offset-2 group-data-[state=focus]/checkbox:outline-ring",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-checked:[&_svg]:opacity-100",
            "peer-checked:group-hover/checkbox:border-primary-hover peer-checked:group-hover/checkbox:bg-primary-hover",
            "peer-checked:group-data-[state=hover]/checkbox:border-primary-hover peer-checked:group-data-[state=hover]/checkbox:bg-primary-hover",
            "peer-disabled:border-border peer-disabled:bg-muted peer-disabled:text-neutral-400",
            "group-data-[state=error]/checkbox:border-destructive group-data-[state=error]/checkbox:bg-red-200 group-data-[state=error]/checkbox:text-destructive",
            "group-data-[indeterminate=true]/checkbox:border-primary group-data-[indeterminate=true]/checkbox:bg-primary",
            "group-data-[indeterminate=true]/checkbox:group-hover/checkbox:border-primary-hover group-data-[indeterminate=true]/checkbox:group-hover/checkbox:bg-primary-hover",
            "group-data-[indeterminate=true]/checkbox:group-data-[state=hover]/checkbox:border-primary-hover group-data-[indeterminate=true]/checkbox:group-data-[state=hover]/checkbox:bg-primary-hover",
            "group-data-[indeterminate=true]/checkbox:peer-disabled:border-border group-data-[indeterminate=true]/checkbox:peer-disabled:bg-muted group-data-[indeterminate=true]/checkbox:peer-disabled:text-neutral-400",
            "group-data-[indeterminate=true]/checkbox:group-data-[state=error]/checkbox:border-destructive group-data-[indeterminate=true]/checkbox:group-data-[state=error]/checkbox:bg-red-200 group-data-[indeterminate=true]/checkbox:group-data-[state=error]/checkbox:text-destructive",
            indicatorClassName,
          )}
        >
          <CheckMark indeterminate={indeterminate} />
        </span>
        {children ?? label ? <span>{children ?? label}</span> : null}
      </label>
    );
  },
);

function CheckMark({ indeterminate }: { indeterminate: boolean }) {
  if (indeterminate) {
    return (
      <span className="h-0 w-[8.5px] rounded-full border-t-[1.5px] border-current" />
    );
  }

  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      className="opacity-0"
    >
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
