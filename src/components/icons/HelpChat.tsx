import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

 const HelpChat = ({ size = 20, ...props }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.1666 15.3584H10.8333L7.12495 17.825C6.57495 18.1917 5.83329 17.8001 5.83329 17.1334V15.3584C3.33329 15.3584 1.66663 13.6917 1.66663 11.1917V6.19169C1.66663 3.69169 3.33329 2.02502 5.83329 2.02502H14.1666C16.6666 2.02502 18.3333 3.69169 18.3333 6.19169V11.1917C18.3333 13.6917 16.6666 15.3584 14.1666 15.3584Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.46667V9.29171C10 8.72504 10.35 8.42503 10.7 8.18336C11.0417 7.95003 11.3833 7.65004 11.3833 7.10004C11.3833 6.33337 10.7667 5.71667 10 5.71667C9.23334 5.71667 8.6167 6.33337 8.6167 7.10004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99629 11.4583H10.0038"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HelpChat