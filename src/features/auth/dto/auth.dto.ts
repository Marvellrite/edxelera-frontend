import type { AuthUserDto } from "@/features/auth/dto/user.dto";

export type SignUpRequestDto = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type VerifyEmailRequestDto = {
  email: string;
  otp: string;
  otp_type: "account_verification";
};

export type OnboardingProfileRequestDto = {
  bio: string;
  location: string;
  secondaryLocation: string;
  learningInterest: string;
  image: File | null;
};

export type OnboardingProfilePayloadDto = Omit<
  OnboardingProfileRequestDto,
  "image"
> & {
  image: string;
};

export type SendForgotPasswordOtpRequestDto = {
  email: string;
};

export type VerifyForgotPasswordOtpRequestDto = {
  email: string;
  otp: string;
};

export type ResetForgottenPasswordRequestDto = {
  email: string;
  otp: string;
  new_password: string;
};

export type AuthTokenResponseDto = {
  access_token?: string;
  accessToken?: string;
  data?: {
    access_token?: string;
    accessToken?: string;
    user?: AuthUserDto;
  };
};

export type AuthApiResponseDto = AuthTokenResponseDto & {
  success?: boolean;
  message?: string;
};
