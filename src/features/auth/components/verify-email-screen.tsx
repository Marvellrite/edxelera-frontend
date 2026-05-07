"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/features/auth/components/otp-input";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas/verify-email-schema";
import { AuthLogo } from "./auth-logo";

const initialValues: VerifyEmailFormValues = {
  code: "",
};

export function VerifyEmailScreen() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: initialValues,
  });
  const code = useWatch({ control, name: "code" });

  function updateCode(nextCode: string) {
    setValue("code", nextCode, {
      shouldDirty: true,
      shouldTouch: true,
    });
    clearErrors("code");
  }

  function submitVerification() {}

  return (
    <main className="min-h-screen bg-card text-foreground">
      <section
        className="mx-auto flex min-h-screen w-full max-w-[430px] justify-center px-4 pt-[95px]"
        aria-label="Verify email"
      >
        <div className="flex w-full max-w-[396px] flex-col items-center gap-10">
          <AuthLogo />

          <form
            noValidate
            onSubmit={handleSubmit(submitVerification)}
            className="flex w-full flex-col gap-6"
          >
            <h1 className="text-[32px] font-semibold leading-10">
              OTP Verification
            </h1>

            <div className="flex flex-col gap-6">
              <p className="text-base leading-6 text-neutral-800">
                Enter the 6 digit OTP sent to your email
              </p>

              <div className="flex flex-col gap-10">
                <OtpInput
                  idPrefix="code"
                  value={code}
                  onChange={updateCode}
                  error={errors.code?.message}
                />

                <Button type="submit" fullWidth>
                  Verify
                </Button>
              </div>
            </div>

            <p className="text-center text-base leading-6 text-neutral-600">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                className="font-semibold text-primary focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Resend
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
