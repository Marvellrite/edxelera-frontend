"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { otpService } from "@/features/auth/services/otp.service";
import ROUTES from "@/lib/config/routes";

export function useSignUpMutation() {
  return useMutation({
    mutationFn: authService.signUp,
  });
}

export function useLoginMutation() {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ()=>{
            router.replace(ROUTES.roleHome.student);
            router.refresh();
    }
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: authService.verifyEmail,
  });
}

export function useUpdateOnboardingProfileMutation() {
  return useMutation({
    mutationFn: authService.updateOnboardingProfile,
  });
}

export function useSendForgotPasswordOtpMutation() {
  return useMutation({
    mutationFn: otpService.sendForgotPasswordOtp,
  });
}

export function useVerifyForgotPasswordOtpMutation() {
  return useMutation({
    mutationFn: otpService.verifyForgotPasswordOtp,
  });
}

export function useResetForgottenPasswordMutation() {
  return useMutation({
    mutationFn: otpService.resetForgottenPassword,
  });
}
