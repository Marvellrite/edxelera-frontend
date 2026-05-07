import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

type SendOtpRequest = { email: string };
type VerifyOtpRequest = { email: string; otp: string };
type ResetPasswordRequest = { email: string; otp: string; newPassword: string };

type PlaceholderResponse = { success: boolean; message?: string };

export async function sendForgotPasswordOtp(payload: SendOtpRequest) {
  return apiClient.post<PlaceholderResponse>(
    `${apiEndpoints.auth}/forgot-password/send-otp`,
    payload,
  );
}

export async function verifyForgotPasswordOtp(payload: VerifyOtpRequest) {
  return apiClient.post<PlaceholderResponse>(
    `${apiEndpoints.auth}/forgot-password/verify-otp`,
    payload,
  );
}

export async function resetForgottenPassword(payload: ResetPasswordRequest) {
  return apiClient.post<PlaceholderResponse>(
    `${apiEndpoints.auth}/forgot-password/reset`,
    payload,
  );
}
