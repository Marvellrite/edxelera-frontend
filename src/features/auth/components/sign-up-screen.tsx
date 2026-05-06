"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
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
                <InputField
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  type="text"
                  leading={<AuthFieldIcon src="/icons/auth-sms.svg" />}
                  placeholder="Enter your full name"
                  value={values.fullName}
                  error={errors.fullName}
                  onChange={(event) =>
                    updateValue("fullName", event.currentTarget.value)
                  }
                />

                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  leading={<AuthFieldIcon src="/icons/auth-sms.svg" />}
                  placeholder="Enter your email"
                  value={values.email}
                  error={errors.email}
                  onChange={(event) =>
                    updateValue("email", event.currentTarget.value)
                  }
                />

                <InputField
                  id="password"
                  name="password"
                  label="Create Password"
                  type="password"
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Create Password"
                  value={values.password}
                  error={errors.password}
                  onChange={(event) =>
                    updateValue("password", event.currentTarget.value)
                  }
                />

                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(event) =>
                    updateValue("confirmPassword", event.currentTarget.value)
                  }
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

                <Button type="submit" fullWidth>
                  Sign Up
                </Button>
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

function AuthFieldIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={24} height={24} aria-hidden="true" />;
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

type SocialButtonProps = {
  iconSrc: string;
  label: string;
};

function SocialButton({ iconSrc, label }: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="social"
      size="icon"
      aria-label={label}
    >
      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden="true" />
    </Button>
  );
}
