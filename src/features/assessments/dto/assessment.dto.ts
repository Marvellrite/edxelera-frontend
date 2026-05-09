export type AssessmentStatusDto = "not_started" | "in_progress" | "completed";

export type AssessmentDto = {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  status: AssessmentStatusDto;
};
