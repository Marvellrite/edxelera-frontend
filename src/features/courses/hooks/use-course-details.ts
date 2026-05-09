"use client";

import { useCourseDetailsQuery } from "@/features/courses/queries/course.queries";

export function useCourseDetails(slug: string) {
  const courseDetailsQuery = useCourseDetailsQuery(slug);

  return {
    courseId: courseDetailsQuery.data?.data.id ?? slug,
    course: courseDetailsQuery.data?.data,
    isLoading: courseDetailsQuery.isLoading,
    error: courseDetailsQuery.error,
  };
}
