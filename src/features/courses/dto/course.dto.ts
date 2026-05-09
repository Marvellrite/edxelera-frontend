export type CourseDto = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

export type CreateCourseDto = {
  title: string;
  description: string;
};

export type UpdateCourseDto = Partial<CreateCourseDto>;
