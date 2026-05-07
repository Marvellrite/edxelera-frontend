type UserAvatarProps = {
  name: string;
};

export function UserAvatar({ name }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="inline-flex size-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium">
      {initials}
    </span>
  );
}
