import type { AuthTokenResponse } from "@/features/auth/types/auth.types";

export type SignUpRequest = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  email: string;
  otp: string;
  otp_type: "account_verification";
};

export type OnboardingProfileRequest = {
  bio: string;
  location: string;
  secondaryLocation: string;
  learningInterest: string;
  image: File | null;
};

export type SendForgotPasswordOtpRequest = {
  email: string;
};

export type VerifyForgotPasswordOtpRequest = {
  email: string;
  otp: string;
};

export type ResetForgottenPasswordRequest = {
  email: string;
  otp: string;
  new_password: string;
};

export type AuthApiResponse = AuthTokenResponse & {
  success?: boolean;
  message?: string;
};
