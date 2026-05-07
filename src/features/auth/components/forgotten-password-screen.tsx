"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
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
  const [stage, setStage] = useState<Stage>("email");
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
    <main className="min-h-screen bg-[#f3f3f3] px-4 py-12 text-[#181818] md:flex md:items-center md:justify-center">
      <section className="mx-auto w-full max-w-[396px]">
        <div className="flex justify-center">
          <Image
            src="/logos/edxelera-logo-light.svg"
            alt="EdXelera"
            width={215}
            height={40}
            priority
          />
        </div>

        {stage === "email" && (
          <form
            noValidate
            onSubmit={emailForm.handleSubmit(submitEmail)}
            className="mt-12 flex flex-col gap-10"
          >
            <h1 className="text-[62px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#090b11] md:text-[56px]">
              Reset Password
            </h1>

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              leading={<Image src="/icons/auth-sms.svg" alt="" width={24} height={24} />}
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register("email")}
            />

            <Button type="submit" fullWidth className="rounded-[30px]" isLoading={isLoading}>
              Send OTP
            </Button>
          </form>
        )}

        {stage === "otp" && (
          <form
            noValidate
            onSubmit={otpForm.handleSubmit(submitOtp)}
            className="mt-12 flex flex-col gap-6"
          >
            <h1 className="text-[44px] font-semibold leading-tight text-[#0c0c0c]">
              OTP Verification
            </h1>
            <p className="text-base leading-6">
              Enter the 6 digit OTP sent to <span className="font-semibold">{email}</span>.
            </p>

            <div>
              <label className="mb-2 block text-base leading-6">OTP</label>
              <div className="flex gap-2">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    value={digit}
                    inputMode="numeric"
                    maxLength={1}
                    className="h-14 w-full rounded-xl border border-[#cbcbcb] bg-white text-center text-xl outline-none focus:border-[#003dae]"
                    onChange={(event) => {
                      const nextValue = event.target.value.replace(/\D/g, "").slice(-1);
                      otpForm.setValue(`otp.${index}`, nextValue, { shouldValidate: true });
                      if (nextValue && index < 5) otpRefs.current[index + 1]?.focus();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !digit && index > 0) {
                        otpRefs.current[index - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </div>
              {otpForm.formState.errors.otp && (
                <p className="mt-2 text-sm text-[#e30202]">{otpForm.formState.errors.otp.message}</p>
              )}
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Verify
            </Button>

            <p className="text-center text-base text-[#303030]">
              Didn&apos;t receive the code? <button type="button" className="font-semibold text-[#003dae]">Resend</button>
            </p>
            <Link href="/auth" className="text-center font-semibold text-[#003dae]">Login with password</Link>
          </form>
        )}

        {stage === "reset" && (
          <form
            noValidate
            onSubmit={resetForm.handleSubmit(submitReset)}
            className="mt-12 flex flex-col gap-6"
          >
            <h1 className="text-[56px] font-medium leading-tight text-[#040506]">Reset Password</h1>

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

            <Button type="submit" fullWidth className="rounded-[30px]" isLoading={isLoading}>
              Change Password
            </Button>
          </form>
        )}

        {errorMessage && <p className="mt-4 text-center text-sm text-[#e30202]">{errorMessage}</p>}
      </section>
    </main>
  );
}
