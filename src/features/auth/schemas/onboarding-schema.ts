import { z } from "zod";

export const onboardingSchema = z.object({
  bio: z.string().trim(),
  location: z.string().trim(),
  secondaryLocation: z.string().trim(),
  learningInterest: z.string().trim(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
