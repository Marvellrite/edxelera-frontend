"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { AuthBackgroundPanels } from "@/features/auth/components/auth-background-panels";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/schemas/sign-up-schema";
import { signUp } from "@/features/auth/services/auth.service";

const initialValues: SignUpFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialValues,
  });

  async function submitSignUp(values: SignUpFormValues) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await signUp({
        fullname: values.fullName,
        email: values.email,
        password: values.password,
      });
      sessionStorage.setItem("pending_verification_email", values.email);
      router.push(
        `/auth/verify-email`,
      );
    } catch {
      setErrorMessage("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <AuthBackgroundPanels imageSrc="/images/auth-sign-up-background.png" />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-12 md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Sign up"
      >
        <div className="w-full max-w-[396px] md:max-w-[469px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[444px]">
          <div className="flex justify-center">
            <AuthLogo />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(submitSignUp)}
            className="mt-[47px] flex flex-col gap-6 md:mt-6"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-[32px] font-semibold leading-10 tracking-normal md:font-medium md:leading-[48px]">
                Sign up
              </h1>

              <div className="flex flex-col gap-4">
                <InputField
                  id="fullName"
                  label="Full Name"
                  type="text"
                  leading={<AuthFieldIcon src="/icons/auth-sms.svg" />}
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />

                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  leading={<AuthFieldIcon src="/icons/auth-sms.svg" />}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <InputField
                  id="password"
                  label="Create Password"
                  type="password"
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Create Password"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Confirm Password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>

              <div className="flex flex-col items-center gap-5">
                <p className="text-center text-base leading-6 md:text-lg md:leading-[27px] lg:text-base lg:leading-6">
                  Already have an account?{" "}
                  <Link
                    href="/auth"
                    className="font-semibold md:font-medium"
                  >
                    Login
                  </Link>
                </p>

                <Button type="submit" fullWidth isLoading={isLoading}>
                  Sign Up
                </Button>
              </div>
            </div>

            {errorMessage ? (
              <p className="text-center text-sm leading-5 text-destructive">
                {errorMessage}
              </p>
            ) : null}

            <p className="text-center text-base leading-6 md:text-base md:leading-6">
              By creating an account, you agree to Edxelera&apos;s{" "}
              <Link
                href="/terms-of-service"
                className="font-semibold md:font-medium"
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-of-service"
                className="font-semibold md:font-medium"
              >
                privacy policy
              </Link>
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="flex w-full items-center justify-center gap-4">
                <span className="h-px flex-1 bg-[#d7d7d7] md:bg-[#a6a6a6]" />
                <span className="whitespace-nowrap text-sm leading-[18px] md:font-medium md:leading-[21px]">
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
