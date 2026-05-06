type CourseSidebarProps = {
  title: string;
};

export function CourseSidebar({ title }: CourseSidebarProps) {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="text-sm font-medium text-zinc-950">{title}</p>
    </aside>
  );
}
