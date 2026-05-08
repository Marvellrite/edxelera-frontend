import type { OnboardingProfileRequest } from "@/features/auth/types";

export type OnboardingProfilePayload = Omit<
  OnboardingProfileRequest,
  "image"
> & {
  image: string;
};
