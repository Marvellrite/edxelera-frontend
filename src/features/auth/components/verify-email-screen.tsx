"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
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

              <InputField
                id="code"
                name="code"
                label="Verification Code"
                inputMode="numeric"
                autoComplete="one-time-code"
                leading={<AuthFieldIcon src="/icons/auth-sms.svg" />}
                value={values.code}
                placeholder="Enter verification code"
                error={errors.code}
                onChange={(event) => updateCode(event.currentTarget.value)}
              />

              <Button type="submit" fullWidth>
                Verify Email
              </Button>
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

function AuthFieldIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={24} height={24} aria-hidden="true" />;
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
