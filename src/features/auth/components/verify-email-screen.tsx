"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas/verify-email-schema";

type VerifyEmailFormErrors = Partial<Record<keyof VerifyEmailFormValues, string>>;

const initialValues: VerifyEmailFormValues = {
  code: "",
};

export function VerifyEmailScreen() {
  const [values, setValues] = useState<VerifyEmailFormValues>(initialValues);
  const [errors, setErrors] = useState<VerifyEmailFormErrors>({});

  function updateCode(code: string) {
    setValues({ code: code.replace(/\D/g, "").slice(0, 6) });
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = verifyEmailSchema.safeParse(values);

    if (!result.success) {
      setErrors({
        code: result.error.issues[0]?.message,
      });
      return;
    }

    setErrors({});
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#181818] md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <BackgroundPanel className="absolute inset-0 hidden md:block lg:hidden" />
      <BackgroundPanel className="relative hidden min-h-screen lg:block" />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-[96px] md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Verify email"
      >
        <div className="w-full max-w-[396px] md:max-w-[469px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[444px]">
          <div className="flex justify-center">
            <Image
              src="/logos/edxelera-logo-light.svg"
              alt="EdXelera"
              width={215}
              height={40}
              priority
              className="h-10 w-[215px]"
            />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-[47px] flex flex-col gap-8 md:mt-10"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-[32px] font-semibold leading-10 tracking-normal text-[#0c0c0c] md:font-medium md:leading-[48px] md:text-[#040506]">
                  Verify email
                </h1>
                <p className="text-base leading-6 text-[#646464]">
                  Enter the 6-digit code sent to your email address.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="code"
                  className="text-base leading-6 text-[#181818] md:font-medium md:text-[#040506]"
                >
                  Verification Code
                </label>
                <div
                  className={`flex h-[58px] w-full items-center gap-2 border bg-white p-4 md:h-[50px] md:rounded-full md:border-transparent md:px-5 ${
                    errors.code
                      ? "rounded-xl border-red-500 md:border-red-500"
                      : "rounded-xl border-[#cbcbcb] md:border-transparent"
                  }`}
                >
                  <Image
                    src="/icons/auth-sms.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <input
                    id="code"
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={values.code}
                    placeholder="Enter verification code"
                    aria-invalid={Boolean(errors.code)}
                    aria-describedby={errors.code ? "code-error" : undefined}
                    onChange={(event) => updateCode(event.currentTarget.value)}
                    className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[#181818] outline-none placeholder:text-[#979797] md:text-sm md:font-medium md:leading-[21px] md:text-[#040506] md:placeholder:text-[#6e6e6e]"
                  />
                </div>
                {errors.code ? (
                  <p id="code-error" className="text-sm leading-5 text-red-600">
                    {errors.code}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center rounded-xl bg-[#003dae] px-6 py-4 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#00349a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
              >
                Verify Email
              </button>
            </div>

            <div className="flex flex-col items-center gap-5 text-center">
              <p className="text-base leading-6 text-[#494949]">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  className="font-semibold text-[#003dae] md:font-medium md:text-[#001146]"
                >
                  Resend
                </button>
              </p>
              <Link href="/auth" className="text-base leading-6 text-[#303030]">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function BackgroundPanel({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Image
        src="/images/auth-background.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/40" />
    </div>
  );
}
