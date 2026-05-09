"use client";

import { useEnrollCourseMutation } from "@/features/courses/mutations/course.mutations";

export function useEnrollCourse() {
  const enrollCourseMutation = useEnrollCourseMutation();

  return {
    enroll: (courseId: string) => enrollCourseMutation.mutateAsync(courseId),
    isLoading: enrollCourseMutation.isPending,
    error: enrollCourseMutation.error,
  };
}
