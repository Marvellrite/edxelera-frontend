import Image from "next/image";

type AuthBackgroundPanelsProps = {
  imageSrc?: string;
};

export function AuthBackgroundPanels({
  imageSrc = "/images/auth-background.png",
}: AuthBackgroundPanelsProps) {
  return (
    <>
      <BackgroundPanel
        className="absolute inset-0 hidden md:block lg:hidden"
        imageSrc={imageSrc}
      />
      <BackgroundPanel
        className="relative hidden min-h-screen lg:block"
        imageSrc={imageSrc}
      />
    </>
  );
}

function BackgroundPanel({
  className,
  imageSrc,
}: {
  className: string;
  imageSrc: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/40" />
    </div>
  );
}
