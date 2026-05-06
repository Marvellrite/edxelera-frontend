import { z } from "zod";

export const onboardingSchema = z.object({
  role: z.enum(["student", "instructor"], {
    error: "Choose how you want to use EdXelera",
  }),
  learningGoal: z
    .string()
    .trim()
    .min(1, "Learning goal is required")
    .min(3, "Learning goal must be at least 3 characters"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
