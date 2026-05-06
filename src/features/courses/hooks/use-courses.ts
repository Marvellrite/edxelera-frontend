"use client";

import { useState } from "react";
import type { Course } from "@/types/course";

export function useCourses(initialCourses: Course[] = []) {
  const [courses] = useState(initialCourses);

  return { courses };
}
