import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  AuthApiResponse,
  ResetForgottenPasswordRequest,
  SendForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpRequest,
} from "@/features/auth/types";

export async function sendForgotPasswordOtp(
  payload: SendForgotPasswordOtpRequest,
) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/forgotten-password`,
    payload,
  );
}

export async function verifyForgotPasswordOtp(
  payload: VerifyForgotPasswordOtpRequest,
) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

export async function resetForgottenPassword(
  payload: ResetForgottenPasswordRequest,
) {
  return apiClient.post<AuthApiResponse>(
    `${apiEndpoints.auth}/reset-password`,
    payload,
  );
}
