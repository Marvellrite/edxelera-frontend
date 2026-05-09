export type AssessmentAttemptDto = {
  id: string;
  assessmentId: string;
  status: "in_progress" | "submitted";
};
