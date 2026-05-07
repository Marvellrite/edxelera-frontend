import Image from "next/image";

type AuthLogoProps = {
  priority?: boolean;
  className?: string;
};

export function AuthLogo({
  priority = true,
  className = "h-10 w-[232px]",
}: AuthLogoProps) {
  return (
    <Image
      src="/logos/edxelera-logo-light.png"
      alt="EdXelera"
      width={1495}
      height={258}
      priority={priority}
      className={className}
    />
  );
}
