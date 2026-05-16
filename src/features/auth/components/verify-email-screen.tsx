"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/features/auth/components/otp-input";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas/verify-email-schema";
import { useVerifyEmailMutation } from "@/features/auth/mutations/auth.mutations";
import { storageService } from "@/lib/services/storage.service";
import { AuthLogo } from "./auth-logo";
import ROUTES from "@/lib/config/routes";

const initialValues: VerifyEmailFormValues = {
  code: "",
};

export function VerifyEmailScreen() {
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmailMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  async function submitVerification(values: VerifyEmailFormValues) {
    const email =
      storageService.getItem("pending_verification_email", "session") ?? "";

    if (!email) {
      setErrorMessage("Please sign up again so we can verify your email.");
      return;
    }

    try {
      setErrorMessage(null);
      await verifyEmailMutation.mutateAsync({
        email,
        otp: values.code,
      });

      storageService.removeItem("pending_verification_email", "session");
      router.push(ROUTES.onboardingRedirect);
    } catch {
      setErrorMessage("Unable to verify this code. Please try again.");
    }
  }

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

                <Button
                  type="submit"
                  fullWidth
                  isLoading={verifyEmailMutation.isPending}
                >
                  Verify
                </Button>
              </div>
            </div>

            {errorMessage ? (
              <p className="text-center text-sm leading-5 text-destructive">
                {errorMessage}
              </p>
            ) : null}

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
