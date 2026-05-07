type RoutePlaceholderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function RoutePlaceholder({
  title,
  description,
  eyebrow = "EdXelera",
}: RoutePlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-wide">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8">
        {description}
      </p>
    </section>
  );
}
