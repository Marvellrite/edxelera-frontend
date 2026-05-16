import Image from "next/image";
import { Button } from "../ui/button";

type SocialButtonProps = {
  iconSrc: string;
  label: string;
};


function SocialButton({ iconSrc, label }: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="social"
      size="icon"
      aria-label={label}
    >
      <Image src={iconSrc} alt="" width={24} height={24} aria-hidden="true" />
    </Button>
  );
}

export default SocialButton