import { http } from "@/shared/services/http-client";
import { apiEndpoints } from "@/shared/constants/api-endpoints";
import type {
  AuthApiResponseDto,
  ResetForgottenPasswordRequestDto,
  SendForgotPasswordOtpRequestDto,
  VerifyForgotPasswordOtpRequestDto,
} from "@/features/auth/dto/auth.dto";

export const otpService = {
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetForgottenPassword,
};

export async function sendForgotPasswordOtp(
  payload: SendForgotPasswordOtpRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/forgotten-password`,
    payload,
  );
}

export async function verifyForgotPasswordOtp(
  payload: VerifyForgotPasswordOtpRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

export async function resetForgottenPassword(
  payload: ResetForgottenPasswordRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/reset-password`,
    payload,
  );
}
