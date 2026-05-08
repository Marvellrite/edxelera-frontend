"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/ui/input";
import { AuthBackgroundPanels } from "@/features/auth/components/auth-background-panels";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";
import {
  getAccessTokenFromResponse,
  login,
} from "@/features/auth/services/auth.service";
import { setAccessTokenCookie } from "@/lib/auth-cookies";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

export function LoginScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  async function submitLogin(values: LoginFormValues) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await login({
        email: values.email,
        password: values.password,
      });
      const accessToken = getAccessTokenFromResponse(response);

      if (accessToken) {
        setAccessTokenCookie(accessToken);
      }

      router.replace("/home");
      router.refresh();
    } catch {
      setErrorMessage(
        "Unable to log in. Please check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <AuthBackgroundPanels />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-[96px] md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Login"
      >
        <div className="w-full max-w-[396px] md:max-w-[469px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[444px]">
          <div className="flex justify-center">
            <AuthLogo />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(submitLogin)}
            className="mt-[47px] flex flex-col gap-8 md:mt-6 md:gap-10 lg:mt-10"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-[32px] font-semibold leading-10 tracking-normal md:font-medium md:leading-[48px]">
                Login
              </h1>

              <div className="flex flex-col gap-4">
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
                  label="Password"
                  type="password"
                  leading={<AuthFieldIcon src="/icons/auth-lock.svg" />}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <div className="flex flex-col gap-6 md:gap-5">
                <div className="flex items-start justify-between gap-4">
                  <Checkbox
                    className="min-w-[125px]"
                    {...register("rememberMe")}
                  >
                    <span className="md:hidden lg:inline">Remember Me</span>
                    <span className="hidden md:inline lg:hidden">Remember me</span>
                  </Checkbox>

                  <Link
                    href="/auth/forgotten-password"
                    className="whitespace-nowrap text-base leading-6"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" fullWidth isLoading={isLoading}>
                  Login
                </Button>
              </div>
            </div>

            {errorMessage ? (
              <p className="text-center text-sm leading-5 text-destructive">
                {errorMessage}
              </p>
            ) : null}

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

              <p className="text-center text-base leading-6 md:text-lg md:leading-[27px] lg:text-base lg:leading-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="font-semibold md:font-medium"
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
