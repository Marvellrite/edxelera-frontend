import type { Course } from "@/types/course";

export function getCoursePath(course: Course) {
  return `/course/${course.slug}`;
}
