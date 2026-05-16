"use client";

import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/features/courses/services/course-service";
import { queryKeys } from "@/lib/react-query/query-keys";

export function useCoursesQuery() {
  return useQuery({
    queryKey: queryKeys.courses.lists(),
    queryFn: courseService.getCourses,
  });
}

export function useCourseDetailsQuery(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.courses.detail(slug ?? ""),
    queryFn: () => courseService.getCourseBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });
}
