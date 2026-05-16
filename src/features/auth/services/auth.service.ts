import { http } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/constants/api-endpoints";
import { uploadFileToS3 } from "@/features/uploads/api/upload-api";
import type {
  AuthApiResponseDto,
  AuthTokenResponseDto,
  LoginRequestDto,
  OnboardingProfilePayloadDto,
  OnboardingProfileRequestDto,
  SignUpRequestDto,
  VerifyEmailRequestDto,
} from "@/features/auth/dto/auth.dto";

export const authService = {
  signUp,
  login,
  verifyEmail,
  updateOnboardingProfile,
};

export async function signUp(payload: SignUpRequestDto) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/sign-up`,
    payload,
  );
}

export async function login(payload: LoginRequestDto) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/sign-in`,
    payload,
  );
}

export async function verifyEmail(payload: VerifyEmailRequestDto) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

export async function updateOnboardingProfile(
  payload: OnboardingProfileRequestDto,
) {
  const { image, ...profileFields } = payload;
  const uploadedImageKey = image ? await uploadFileToS3(image, image.name) : "";

  if (uploadedImageKey) {
    await http.patch<AuthApiResponseDto>(
      `${apiEndpoints.profile}/change-avatar`,
      { image: uploadedImageKey },
    );
  }

  const profileFieldsPayload: Omit<OnboardingProfilePayloadDto, "image"> =
    profileFields;

  return http.patch<AuthApiResponseDto>(
    `${apiEndpoints.profile}/edit`,
    profileFieldsPayload,
  );
}

export function getAccessTokenFromResponse(response: AuthTokenResponseDto) {
  return (
    response.access_token ??
    response.accessToken ??
    response.data?.access_token ??
    response.data?.accessToken
  );
}
