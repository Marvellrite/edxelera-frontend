import Image from "next/image";

export function PasswordVisibilityButton({
  isVisible,
  onToggle,
}: {
  isVisible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex size-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label={isVisible ? "Hide password" : "Show password"}
      aria-pressed={isVisible}
    >
      <Image
        src={isVisible ? "/icons/auth-eye-slash.svg" : "/icons/auth-eye.svg"}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
    </button>
  );
}
