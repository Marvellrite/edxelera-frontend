import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { uploadFileToS3 } from "@/features/uploads/api/upload-api";
import type { OnboardingProfilePayload } from "@/features/auth/services/auth.types";
import type {
  AuthApiResponse,
  AuthTokenResponse,
  LoginRequest,
  OnboardingProfileRequest,
  SignUpRequest,
  VerifyEmailRequest,
} from "@/features/auth/types";

export async function signUp(payload: SignUpRequest) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/sign-up`,
    payload,
  );
}

export async function login(payload: LoginRequest) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/sign-in`,
    payload,
  );
}

export async function verifyEmail(payload: VerifyEmailRequest) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

export async function updateOnboardingProfile(
  payload: OnboardingProfileRequest,
) {
  const { image, ...profileFields } = payload;
  const uploadedImageKey = image ? await uploadFileToS3(image, image.name) : "";

  if (uploadedImageKey) {
    await apiClient.patch<AuthApiResponse>(
      `${apiEndpoints.profile}/change-avatar`,
      { image: uploadedImageKey },
    );
  }

  const profileFieldsPayload: Omit<OnboardingProfilePayload, "image"> =
    profileFields;

  return apiClient.patch<AuthApiResponse>(
    `${apiEndpoints.profile}/edit`,
    profileFieldsPayload,
  );
}

export function getAccessTokenFromResponse(response: AuthTokenResponse) {
  return (
    response.access_token ??
    response.accessToken ??
    response.data?.access_token ??
    response.data?.accessToken
  );
}
