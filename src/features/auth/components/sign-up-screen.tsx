"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/schemas/sign-up-schema";

type SignUpFormErrors = Partial<Record<keyof SignUpFormValues, string>>;

const initialValues: SignUpFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpScreen() {
  const [values, setValues] = useState<SignUpFormValues>(initialValues);
  const [errors, setErrors] = useState<SignUpFormErrors>({});

  function updateValue<TKey extends keyof SignUpFormValues>(
    key: TKey,
    value: SignUpFormValues[TKey],
  ) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = signUpSchema.safeParse(values);

    if (!result.success) {
      setErrors(
        result.error.issues.reduce<SignUpFormErrors>((nextErrors, issue) => {
          const field = issue.path[0];

          if (
            field === "fullName" ||
            field === "email" ||
            field === "password" ||
            field === "confirmPassword"
          ) {
            nextErrors[field] = issue.message;
          }

          return nextErrors;
        }, {}),
      );
      return;
    }

    setErrors({});
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#181818] md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <BackgroundPanel className="absolute inset-0 hidden md:block lg:hidden" />
      <BackgroundPanel className="relative hidden min-h-screen lg:block" />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-12 md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Sign up"
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
            className="mt-[47px] flex flex-col gap-6 md:mt-6"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-[32px] font-semibold leading-10 tracking-normal text-[#0c0c0c] md:font-medium md:leading-[48px] md:text-[#040506]">
                Sign up
              </h1>

              <div className="flex flex-col gap-4">
                <SignUpTextField
                  id="fullName"
                  label="Full Name"
                  type="text"
                  iconSrc="/icons/auth-sms.svg"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  error={errors.fullName}
                  onChange={(value) => updateValue("fullName", value)}
                />

                <SignUpTextField
                  id="email"
                  label="Email"
                  type="email"
                  iconSrc="/icons/auth-sms.svg"
                  placeholder="Enter your email"
                  value={values.email}
                  error={errors.email}
                  onChange={(value) => updateValue("email", value)}
                />

                <SignUpTextField
                  id="password"
                  label="Create Password"
                  type="password"
                  iconSrc="/icons/auth-lock.svg"
                  placeholder="Create Password"
                  value={values.password}
                  error={errors.password}
                  onChange={(value) => updateValue("password", value)}
                />

                <SignUpTextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  iconSrc="/icons/auth-lock.svg"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(value) => updateValue("confirmPassword", value)}
                />
              </div>

              <div className="flex flex-col items-center gap-5">
                <p className="text-center text-base leading-6 text-[#303030] md:text-lg md:leading-[27px] md:text-[#494949] lg:text-base lg:leading-6">
                  Already have an account?{" "}
                  <Link
                    href="/auth"
                    className="font-semibold text-[#003dae] md:font-medium md:text-[#001146]"
                  >
                    Login
                  </Link>
                </p>

                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center rounded-xl bg-[#003dae] px-6 py-4 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#00349a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <p className="text-center text-base leading-6 text-[#494949] md:text-base md:leading-6">
              By creating an account, you agree to Edxelera&apos;s{" "}
              <Link
                href="/terms-and-services"
                className="font-semibold text-[#003dae] md:font-medium md:text-[#001146]"
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-and-services"
                className="font-semibold text-[#003dae] md:font-medium md:text-[#001146]"
              >
                privacy policy
              </Link>
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="flex w-full items-center justify-center gap-4">
                <span className="h-px flex-1 bg-[#d7d7d7] md:bg-[#a6a6a6]" />
                <span className="whitespace-nowrap text-sm leading-[18px] text-[#646464] md:font-medium md:leading-[21px] md:text-[#6e6e6e]">
                  Or continue with
                </span>
                <span className="h-px flex-1 bg-[#d7d7d7] md:bg-[#a6a6a6]" />
              </div>

              <div className="flex items-start gap-3">
                <SocialButton
                  iconSrc="/icons/auth-apple.svg"
                  label="Continue with Apple"
                />
                <SocialButton
                  iconSrc="/icons/auth-google.svg"
                  label="Continue with Google"
                />
              </div>
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
        src="/images/auth-sign-up-background.png"
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

type SignUpTextFieldProps = {
  id: keyof SignUpFormValues;
  label: string;
  type: "email" | "password" | "text";
  iconSrc: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function SignUpTextField({
  id,
  label,
  type,
  iconSrc,
  placeholder,
  value,
  error,
  onChange,
}: SignUpTextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base leading-6 text-[#181818] md:font-medium md:text-[#040506]"
      >
        {label}
      </label>
      <div
        className={`flex h-[58px] w-full items-center gap-2 border bg-white p-4 md:h-[50px] md:rounded-full md:border-transparent md:px-5 ${
          error
            ? "rounded-xl border-red-500 md:border-red-500"
            : "rounded-xl border-[#cbcbcb] md:border-transparent"
        }`}
      >
        <Image src={iconSrc} alt="" width={24} height={24} aria-hidden="true" />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.currentTarget.value)}
          className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[#181818] outline-none placeholder:text-[#979797] md:text-sm md:font-medium md:leading-[21px] md:text-[#040506] md:placeholder:text-[#6e6e6e]"
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm leading-5 text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SocialButtonProps = {
  iconSrc: string;
  label: string;
};

function SocialButton({ iconSrc, label }: SocialButtonProps) {
  return (
    <button
      type="button"
      className="flex size-16 items-center justify-center rounded-full bg-[#ebebeb] transition-colors hover:bg-[#e2e2e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae] md:bg-white md:hover:bg-[#f7f7f7]"
      aria-label={label}
    >
      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden="true" />
    </button>
  );
}
