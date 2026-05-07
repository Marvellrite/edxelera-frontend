"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthBackgroundPanels } from "@/features/auth/components/auth-background-panels";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas/verify-email-schema";

const initialValues: VerifyEmailFormValues = {
  code: "",
};

const codeLength = 6;

export function VerifyEmailScreen() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: initialValues,
  });
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const code = useWatch({ control, name: "code" });

  function updateCode(nextCode: string, focusIndex?: number) {
    setValue("code", nextCode.slice(0, codeLength), {
      shouldDirty: true,
      shouldTouch: true,
    });
    clearErrors("code");

    if (typeof focusIndex === "number") {
      codeInputRefs.current[focusIndex]?.focus();
    }
  }

  function updateCodeAtIndex(index: number, rawValue: string) {
    const digits = rawValue.replace(/\D/g, "");

    if (!digits) {
      updateCode(replaceCodeDigit(code, index, ""));
      return;
    }

    const codeDigits = code.padEnd(codeLength, " ").split("");

    digits
      .slice(0, codeLength - index)
      .split("")
      .forEach((digit, digitIndex) => {
        codeDigits[index + digitIndex] = digit;
      });

    const nextCode = codeDigits.join("").trimEnd();
    const nextFocusIndex = Math.min(index + digits.length, codeLength - 1);
    updateCode(nextCode, nextFocusIndex);
  }

  function handleCodePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    updateCode(
      event.clipboardData.getData("text").replace(/\D/g, ""),
      codeLength - 1,
    );
  }

  function handleCodeKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  }

  function submitVerification() {}

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#181818] md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <AuthBackgroundPanels />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-[96px] md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Verify email"
      >
        <div className="w-full max-w-[793px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[560px] xl:max-w-[640px]">
          <div className="flex justify-center">
            <AuthLogo className="h-10 w-[232px]" />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(submitVerification)}
            className="mt-[108px] flex flex-col gap-[59px] md:mt-20 md:gap-12 lg:mt-16"
          >
            <div className="flex flex-col gap-20 md:gap-14 lg:gap-12">
              <div className="flex flex-col gap-[74px] md:gap-12 lg:gap-10">
                <div className="flex flex-col gap-16 md:gap-10">
                  <h1 className="text-[40px] font-semibold leading-[48px] tracking-normal text-[#040506] md:text-[48px] md:leading-[58px] lg:text-[44px] lg:leading-[54px]">
                    OTP Verification
                  </h1>
                  <p className="max-w-[708px] text-[28px] font-semibold leading-[48px] text-[#040506] md:text-[30px] lg:text-[24px] lg:leading-9">
                    Enter the 6 digit OTP sent to your email to reset your
                    password
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div
                    className="grid grid-cols-6 gap-[14px] md:gap-4"
                    aria-label="6 digit verification code"
                  >
                    {Array.from({ length: codeLength }, (_, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          codeInputRefs.current[index] = element;
                        }}
                        id={index === 0 ? "code" : undefined}
                        name={index === 0 ? "code" : undefined}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        aria-label={`Digit ${index + 1}`}
                        value={code[index]?.trim() ?? ""}
                        maxLength={1}
                        onChange={(event) =>
                          updateCodeAtIndex(index, event.currentTarget.value)
                        }
                        onKeyDown={(event) => handleCodeKeyDown(index, event)}
                        onPaste={handleCodePaste}
                        className="aspect-square min-w-0 rounded-full border border-[#cbcbcb] bg-white text-center text-[32px] font-semibold leading-none text-[#181818] outline-none transition-colors focus:border-[#003dae] focus:ring-2 focus:ring-[#003dae] md:text-[40px] lg:text-[32px]"
                      />
                    ))}
                  </div>
                  {errors.code ? (
                    <p className="text-sm leading-5 text-[#e30202]">
                      {errors.code.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                className="h-[116px] rounded-full text-[36px] font-semibold leading-[54px] md:h-20 md:text-3xl lg:h-16 lg:text-2xl"
              >
                Verify
              </Button>
            </div>

            <div className="flex flex-col items-center gap-8 text-center md:gap-6">
              <p className="text-[32px] font-semibold leading-[38px] text-[#494949] md:text-2xl lg:text-xl">
                Didn&apos;t see code?{" "}
                <button
                  type="button"
                  className="font-semibold text-[#003dae] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
                >
                  Resend Code
                </button>
              </p>
              <Link
                href="/auth"
                className="text-[32px] font-semibold leading-[38px] text-[#003dae] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae] md:text-2xl lg:text-xl"
              >
                Login with password
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function replaceCodeDigit(code: string, index: number, digit: string) {
  const codeDigits = code.padEnd(codeLength, " ").split("");
  codeDigits[index] = digit || " ";
  return codeDigits.join("").trimEnd();
}

