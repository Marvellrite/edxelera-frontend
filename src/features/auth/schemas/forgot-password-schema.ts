import { z } from "zod";

export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export const forgotPasswordOtpSchema = z.object({
  otp: z
    .array(z.string().regex(/^\d$/, "OTP must contain only digits"))
    .length(6, "Enter the 6-digit OTP"),
});

export const forgotPasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordEmailValues = z.infer<typeof forgotPasswordEmailSchema>;
export type ForgotPasswordOtpValues = z.infer<typeof forgotPasswordOtpSchema>;
export type ForgotPasswordResetValues = z.infer<typeof forgotPasswordResetSchema>;
