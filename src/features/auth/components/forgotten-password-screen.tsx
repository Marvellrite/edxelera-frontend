"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { InputField } from "@/shared/components/ui/input";
import { Link } from "@/shared/components/ui/link";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import { OtpInput } from "@/features/auth/components/otp-input";
import {
  forgotPasswordEmailSchema,
  forgotPasswordOtpSchema,
  forgotPasswordResetSchema,
  type ForgotPasswordEmailValues,
  type ForgotPasswordOtpValues,
  type ForgotPasswordResetValues,
} from "@/features/auth/schemas/forgot-password-schema";
import {
  useResetForgottenPasswordMutation,
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/features/auth/mutations/auth.mutations";

type Stage = "email" | "otp" | "reset";

export function ForgottenPasswordScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sendForgotPasswordOtpMutation = useSendForgotPasswordOtpMutation();
  const verifyForgotPasswordOtpMutation = useVerifyForgotPasswordOtpMutation();
  const resetForgottenPasswordMutation = useResetForgottenPasswordMutation();
  const isLoading =
    sendForgotPasswordOtpMutation.isPending ||
    verifyForgotPasswordOtpMutation.isPending ||
    resetForgottenPasswordMutation.isPending;

  const emailForm = useForm<ForgotPasswordEmailValues>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<ForgotPasswordOtpValues>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const resetForm = useForm<ForgotPasswordResetValues>({
    resolver: zodResolver(forgotPasswordResetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const otpValues = useWatch({ control: otpForm.control, name: "otp" });
  const otpCode = otpValues.join("");
  const otpError = getOtpErrorMessage(otpForm.formState.errors.otp);

  function updateOtpCode(nextOtp: string) {
    otpForm.setValue(
      "otp",
      Array.from({ length: 6 }, (_, index) => nextOtp[index] ?? ""),
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );
    otpForm.clearErrors("otp");
  }

  async function submitEmail(values: ForgotPasswordEmailValues) {
    try {
      setErrorMessage(null);
      await sendForgotPasswordOtpMutation.mutateAsync(values);
      setEmail(values.email);
      setStage("otp");
    } catch {
      setErrorMessage("Unable to send OTP. Please try again.");
    }
  }

  async function submitOtp(values: ForgotPasswordOtpValues) {
    const otp = values.otp.join("");

    try {
      setErrorMessage(null);
      await verifyForgotPasswordOtpMutation.mutateAsync({ email, otp });
      setOtpToken(otp);
      setStage("reset");
    } catch {
      setErrorMessage("Invalid OTP. Please check and try again.");
    }
  }

  async function submitReset(values: ForgotPasswordResetValues) {
    try {
      setErrorMessage(null);
      await resetForgottenPasswordMutation.mutateAsync({
        email,
        otp: otpToken,
        new_password: values.password,
      });
      router.push("/auth");
    } catch {
      setErrorMessage("Password reset failed. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white px-[17px]">
      <section className="mx-auto flex w-full max-w-[396px] flex-col items-center gap-10 pt-[95px]">
        <AuthLogo className="h-10 w-[214.63px]" />

        {stage === "email" && (
          <form
            noValidate
            onSubmit={emailForm.handleSubmit(submitEmail)}
            className="flex w-full flex-col gap-6 backdrop-blur-[50px]"
          >
            <h1 className="text-[32px] font-semibold leading-10 tracking-normal">
              Reset Password
            </h1>

            <div className="flex flex-col items-center gap-10">
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                leading={
                  <Image
                    src="/icons/auth-sms.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                }
                error={emailForm.formState.errors.email?.message}
                {...emailForm.register("email")}
              />

              <Button type="submit" fullWidth isLoading={isLoading}>
                Send OTP
              </Button>
            </div>
          </form>
        )}

        {stage === "otp" && (
          <form
            noValidate
            onSubmit={otpForm.handleSubmit(submitOtp)}
            className="flex w-full flex-col gap-6 backdrop-blur-[50px]"
          >
            <h1 className="text-[32px] font-semibold leading-10 tracking-normal">
              OTP Verification
            </h1>

            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-col items-start gap-6">
                <p className="w-full text-base leading-6">
                  Enter the 6 digit OTP sent to your email to reset your
                  password
                </p>

                <div className="flex w-full flex-col items-center gap-10">
                  <OtpInput
                    value={otpCode}
                    onChange={updateOtpCode}
                    error={otpError}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Verify
                  </Button>
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-3">
                <p className="text-center text-base leading-6">
                  Didn&apos;t receive the code?{" "}
                  <button type="button" className="font-semibold text-primary">
                    Resend
                  </button>
                </p>
                <Link
                  href="/auth"
                  color="blue"
                  className="text-center text-base font-semibold leading-6"
                >
                  Login with password
                </Link>
              </div>
            </div>
          </form>
        )}

        {stage === "reset" && (
          <form
            noValidate
            onSubmit={resetForm.handleSubmit(submitReset)}
            className="flex w-full flex-col gap-6"
          >
            <h1 className="text-[32px] font-semibold leading-10">Reset Password</h1>

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter new password"
              leading={<Image src="/icons/auth-lock.svg" alt="" width={24} height={24} />}
              error={resetForm.formState.errors.password?.message}
              {...resetForm.register("password")}
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              leading={<Image src="/icons/auth-lock.svg" alt="" width={24} height={24} />}
              error={resetForm.formState.errors.confirmPassword?.message}
              {...resetForm.register("confirmPassword")}
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Change Password
            </Button>
          </form>
        )}

        {errorMessage && <p className="mt-4 text-center text-sm">{errorMessage}</p>}
      </section>
    </main>
  );
}

function getOtpErrorMessage(error: unknown): string | undefined {
  if (!error) {
    return undefined;
  }

  if (hasMessage(error)) {
    return error.message;
  }

  if (Array.isArray(error)) {
    return error.find(hasMessage)?.message;
  }

  return undefined;
}

function hasMessage(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (value as { message?: unknown }).message === "string"
  );
}
