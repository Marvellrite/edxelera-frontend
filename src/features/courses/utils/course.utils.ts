import type { Course } from "@/lib/types/course";

export function getCoursePath(course: Course) {
  return `/course/${course.slug}`;
}
