export type CourseEnrollmentStatusDto =
  | "available"
  | "enrolled"
  | "completed";

export type CourseEnrollmentDto = {
  courseId: string;
  status: CourseEnrollmentStatusDto;
};
