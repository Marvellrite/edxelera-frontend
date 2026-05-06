import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { Course } from "@/types/course";

export function getCourses() {
  return apiClient.get<ApiResponse<Course[]>>(apiEndpoints.courses);
}
