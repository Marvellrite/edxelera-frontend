"use client";

import type { ClipboardEvent, KeyboardEvent } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const otpLength = 6;

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  idPrefix?: string;
  label?: string;
};

export function OtpInput({
  value,
  onChange,
  error,
  idPrefix = "otp",
  label = "OTP",
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(otpLength, " ").slice(0, otpLength).split("");

  function updateOtp(nextValue: string, focusIndex?: number) {
    onChange(nextValue.replace(/\D/g, "").slice(0, otpLength));

    if (typeof focusIndex === "number") {
      inputRefs.current[focusIndex]?.focus();
    }
  }

  function updateDigit(index: number, rawValue: string) {
    const nextDigits = digits.map((digit) => digit.trim());
    const inputDigits = rawValue.replace(/\D/g, "");

    if (!inputDigits) {
      nextDigits[index] = "";
      updateOtp(nextDigits.join(""));
      return;
    }

    inputDigits
      .slice(0, otpLength - index)
      .split("")
      .forEach((digit, digitIndex) => {
        nextDigits[index + digitIndex] = digit;
      });

    updateOtp(
      nextDigits.join(""),
      Math.min(index + inputDigits.length, otpLength - 1),
    );
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    updateOtp(event.clipboardData.getData("text"), otpLength - 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index].trim() && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={`${idPrefix}-0`}
        className="text-base leading-6 text-neutral-800"
      >
        {label}
      </label>
      <div className="grid grid-cols-6 gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            id={`${idPrefix}-${index}`}
            name={index === 0 ? idPrefix : undefined}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`${label} digit ${index + 1}`}
            aria-invalid={Boolean(error)}
            value={digit.trim()}
            maxLength={1}
            onChange={(event) => updateDigit(index, event.currentTarget.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="h-14 min-w-0 rounded-xl border border-border bg-card text-center text-2xl font-semibold leading-none outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>
      <p
        className={cn(
          "min-h-5 text-sm leading-5 text-destructive",
          !error && "invisible",
        )}
      >
        {error}
      </p>
    </div>
  );
}
