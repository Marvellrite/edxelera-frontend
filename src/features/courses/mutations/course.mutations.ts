"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/features/courses/services/course-service";
import { queryKeys } from "@/shared/react-query/query-keys";
import type { UpdateCourseDto } from "@/features/courses/dto/course.dto";

export function useCreateCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });
    },
  });
}

export function useUpdateCourseMutation(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCourseDto) =>
      courseService.updateCourse(slug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.detail(slug),
      });
    },
  });
}

export function useDeleteCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });
    },
  });
}

export function useEnrollCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.enrollCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });
    },
  });
}
