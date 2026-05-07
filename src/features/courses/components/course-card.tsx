import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4">
      <h2 className="text-base font-semibold">{course.title}</h2>
      <p className="mt-2 text-sm">{course.description}</p>
    </article>
  );
}
