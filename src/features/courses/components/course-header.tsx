type CourseHeaderProps = {
  title: string;
  description: string;
};

export function CourseHeader({ title, description }: CourseHeaderProps) {
  return (
    <header>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-3">{description}</p>
    </header>
  );
}
