"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import {
  forgotPasswordEmailSchema,
  forgotPasswordOtpSchema,
  forgotPasswordResetSchema,
  type ForgotPasswordEmailValues,
  type ForgotPasswordOtpValues,
  type ForgotPasswordResetValues,
} from "@/features/auth/schemas/forgot-password-schema";
import {
  resetForgottenPassword,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "@/features/auth/services/forgot-password-service";

type Stage = "email" | "otp" | "reset";

export function ForgottenPasswordScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("reset");
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpValues = useWatch({ control: otpForm.control, name: "otp" });

  async function submitEmail(values: ForgotPasswordEmailValues) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await sendForgotPasswordOtp(values);
      setEmail(values.email);
      setStage("otp");
    } catch {
      setErrorMessage("Unable to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitOtp(values: ForgotPasswordOtpValues) {
    const otp = values.otp.join("");

    try {
      setIsLoading(true);
      setErrorMessage(null);
      await verifyForgotPasswordOtp({ email, otp });
      setOtpToken(otp);
      setStage("reset");
    } catch {
      setErrorMessage("Invalid OTP. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitReset(values: ForgotPasswordResetValues) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await resetForgottenPassword({
        email,
        otp: otpToken,
        newPassword: values.password,
      });
      router.push("/auth");
    } catch {
      setErrorMessage("Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
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
                  <div className="flex w-full flex-col items-start gap-2">
                    <label className="block text-base leading-6">OTP</label>
                    <div className="flex h-14 w-full items-start gap-2">
                      {otpValues.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el;
                          }}
                          value={digit}
                          inputMode="numeric"
                          maxLength={1}
                          aria-label={`OTP digit ${index + 1}`}
                          className="h-14 min-w-0 flex-1 rounded-xl border border-[#cbcbcb] bg-white p-4 text-center text-xl outline-none transition-colors focus:border-[#003dae]"
                          onChange={(event) => {
                            const nextValue = event.target.value
                              .replace(/\D/g, "")
                              .slice(-1);
                            otpForm.setValue(`otp.${index}`, nextValue, {
                              shouldValidate: true,
                            });
                            if (nextValue && index < 5) {
                              otpRefs.current[index + 1]?.focus();
                            }
                          }}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Backspace" &&
                              !digit &&
                              index > 0
                            ) {
                              otpRefs.current[index - 1]?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                    {otpForm.formState.errors.otp && (
                      <p className="text-sm leading-5">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

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
                  <button type="button" className="font-semibold text-[#003dae]">
                    Resend
                  </button>
                </p>
                <Link
                  href="/auth"
                  className="text-center text-base font-semibold leading-6 text-[#003dae]"
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              leading={<Image src="/icons/auth-lock.svg" alt="" width={24} height={24} />}
              trailing={<button type="button" onClick={() => setShowPassword((v) => !v)}>{showPassword ? "Hide" : "Show"}</button>}
              error={resetForm.formState.errors.password?.message}
              {...resetForm.register("password")}
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              leading={<Image src="/icons/auth-lock.svg" alt="" width={24} height={24} />}
              trailing={<button type="button" onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? "Hide" : "Show"}</button>}
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
