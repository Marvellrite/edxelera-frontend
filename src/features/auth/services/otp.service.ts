import { http } from "@/shared/services/api-client";
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

async function sendForgotPasswordOtp(
  payload: SendForgotPasswordOtpRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/forgotten-password`,
    payload,
  );
}

async function verifyForgotPasswordOtp(
  payload: VerifyForgotPasswordOtpRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/verify-otp`,
    payload,
  );
}

async function resetForgottenPassword(
  payload: ResetForgottenPasswordRequestDto,
) {
  return http.post<AuthApiResponseDto>(
    `${apiEndpoints.auth}/reset-password`,
    payload,
  );
}
