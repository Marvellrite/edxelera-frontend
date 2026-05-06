type CourseHeaderProps = {
  title: string;
  description: string;
};

export function CourseHeader({ title, description }: CourseHeaderProps) {
  return (
    <header>
      <h1 className="text-3xl font-semibold text-zinc-950">{title}</h1>
      <p className="mt-3 text-zinc-600">{description}</p>
    </header>
  );
}
