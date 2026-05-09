"use client";

import { useState } from "react";
import { useCoursesQuery } from "@/features/courses/queries/course.queries";
import type { CourseDto } from "@/features/courses/dto/course.dto";

export function useCourses(initialCourses: CourseDto[] = []) {
  const coursesQuery = useCoursesQuery();
  const [courses] = useState(initialCourses);

  return {
    courses: coursesQuery.data?.data ?? courses,
    isLoading: coursesQuery.isLoading,
    error: coursesQuery.error,
  };
}
