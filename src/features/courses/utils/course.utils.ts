import type { Course } from "@/shared/types/course";

export function getCoursePath(course: Course) {
  return `/course/${course.slug}`;
}
