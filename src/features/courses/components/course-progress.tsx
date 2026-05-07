type CourseProgressProps = {
  value: number;
};

export function CourseProgress({ value }: CourseProgressProps) {
  return (
    <div className="h-2 rounded-full bg-zinc-200">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
