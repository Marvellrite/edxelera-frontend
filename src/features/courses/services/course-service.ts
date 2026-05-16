import { apiEndpoints } from "@/lib/constants/api-endpoints";
import { http } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/types/api";
import type {
  CourseDto,
  CreateCourseDto,
  UpdateCourseDto,
} from "@/features/courses/dto/course.dto";
import type { CourseEnrollmentDto } from "@/features/courses/dto/enrollment.dto";

export const courseService = {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
};

export function getCourses() {
  return http.get<ApiResponse<CourseDto[]>>(apiEndpoints.courses);
}

export function getCourseBySlug(slug: string) {
  return http.get<ApiResponse<CourseDto>>(`${apiEndpoints.courses}/${slug}`);
}

export function createCourse(payload: CreateCourseDto) {
  return http.post<ApiResponse<CourseDto>>(apiEndpoints.courses, payload);
}

export function updateCourse(slug: string, payload: UpdateCourseDto) {
  return http.patch<ApiResponse<CourseDto>>(
    `${apiEndpoints.courses}/${slug}`,
    payload,
  );
}

export function deleteCourse(slug: string) {
  return http.delete<void>(`${apiEndpoints.courses}/${slug}`);
}

export function enrollCourse(courseId: string) {
  return http.post<ApiResponse<CourseEnrollmentDto>>(
    `${apiEndpoints.courses}/${courseId}/enroll`,
    {},
  );
}
