"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { getValueState, inputControlClassName } from "./input.helpers";
import { InputShell } from "./input-shell";
import { InputSlot } from "./input-slot";
import { PasswordVisibilityButton } from "./password-visibility-button";

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
