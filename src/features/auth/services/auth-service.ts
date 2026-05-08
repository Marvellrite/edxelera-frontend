import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { uploadFileToS3 } from "@/features/uploads/api/upload-api";

export type SignUpRequest = {
  fullname: string;
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

type OnboardingProfilePayload = {
  bio: string;
  location: string;
  secondaryLocation: string;
  learningInterest: string;
  image: string;
};

type TokenResponse = {
  access_token?: string;
  accessToken?: string;
  data?: {
    access_token?: string;
    accessToken?: string;
  };
};

type AuthResponse = TokenResponse & {
  success?: boolean;
  message?: string;
};

export async function signUp(payload: SignUpRequest) {
  return apiClient.post<AuthResponse>(`${apiEndpoints.auth}/sign-up`, payload);
}

export async function verifyEmail(payload: VerifyEmailRequest) {
  return apiClient.post<AuthResponse>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

export async function updateOnboardingProfile(
  payload: OnboardingProfileRequest,
) {
  const { image, ...profileFields } = payload;
  const uploadedImageKey = image ? await uploadFileToS3(image, image.name) : "";

  const onboardingPayload: OnboardingProfilePayload = {
    ...profileFields,
    image: uploadedImageKey,
  };

  return apiClient.patch<AuthResponse>(
    `${apiEndpoints.profile}/edit`,
    onboardingPayload,
  );
}

export function getAccessTokenFromResponse(response: TokenResponse) {
  return (
    response.access_token ??
    response.accessToken ??
    response.data?.access_token ??
    response.data?.accessToken
  );
}
