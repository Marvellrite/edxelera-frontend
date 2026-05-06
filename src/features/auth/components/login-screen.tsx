"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

export function LoginScreen() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  function updateValue<TKey extends keyof LoginFormValues>(
    key: TKey,
    value: LoginFormValues[TKey],
  ) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = loginSchema.safeParse(values);

    if (!result.success) {
      setErrors(
        result.error.issues.reduce<LoginFormErrors>((nextErrors, issue) => {
          const field = issue.path[0];

          if (
            field === "email" ||
            field === "password" ||
            field === "rememberMe"
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
        className="relative z-10 flex min-h-screen justify-center px-4 py-[96px] md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Login"
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
            className="mt-[47px] flex flex-col gap-8 md:mt-6 md:gap-10 lg:mt-10"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-[32px] font-semibold leading-10 tracking-normal text-[#0c0c0c] md:font-medium md:leading-[48px] md:text-[#040506]">
                Login
              </h1>

              <div className="flex flex-col gap-4">
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
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Enter your password"
                  value={values.password}
                  error={errors.password}
                  onChange={(event) =>
                    updateValue("password", event.currentTarget.value)
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((isVisible) => !isVisible)}
                      className="flex size-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      <Image
                        src={
                          showPassword
                            ? "/icons/auth-eye.svg"
                            : "/icons/auth-eye-slash.svg"
                        }
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                    </button>
                  }
                />
              </div>

              <div className="flex flex-col gap-6 md:gap-5">
                <div className="flex items-start justify-between gap-4">
                  <label className="flex min-w-[125px] items-center gap-2 text-base leading-6 text-[#303030] md:text-[#2c2c2c]">
                    <input
                      type="checkbox"
                      checked={values.rememberMe}
                      onChange={(event) =>
                        updateValue("rememberMe", event.currentTarget.checked)
                      }
                      className="peer sr-only"
                    />
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#003dae] ${
                        values.rememberMe
                          ? "border-[#003dae] bg-[#003dae] text-white"
                          : "border-[#cbcbcb] bg-white text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      <CheckIcon />
                    </span>
                    <span className="md:hidden lg:inline">Remember Me</span>
                    <span className="hidden md:inline lg:hidden">Remember me</span>
                  </label>

                  <Link
                    href="/auth/forgotten-password"
                    className="whitespace-nowrap text-base leading-6 text-[#303030] md:text-[#2c2c2c]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" fullWidth>
                  Login
                </Button>
              </div>
            </div>

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

              <p className="text-center text-base leading-6 text-[#303030] md:text-lg md:leading-[27px] md:text-[#494949] lg:text-base lg:leading-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="font-semibold text-[#003dae] md:font-medium md:text-[#001146]"
                >
                  Sign Up
                </Link>
              </p>
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

function CheckIcon() {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      aria-hidden="true"
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
