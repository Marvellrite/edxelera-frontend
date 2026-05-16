import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  stroke?: string;
};

export const GridIcon = ({
  size = 20,
  stroke = "currentColor",
  ...props
}: Props) => {
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
        d="M14.1666 8.33335H15.8333C17.5 8.33335 18.3333 7.50002 18.3333 5.83335V4.16669C18.3333 2.50002 17.5 1.66669 15.8333 1.66669H14.1666C12.5 1.66669 11.6666 2.50002 11.6666 4.16669V5.83335C11.6666 7.50002 12.5 8.33335 14.1666 8.33335Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16663 18.3334H5.83329C7.49996 18.3334 8.33329 17.5 8.33329 15.8334V14.1667C8.33329 12.5 7.49996 11.6667 5.83329 11.6667H4.16663C2.49996 11.6667 1.66663 12.5 1.66663 14.1667V15.8334C1.66663 17.5 2.49996 18.3334 4.16663 18.3334Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.99996 8.33335C6.84091 8.33335 8.33329 6.84097 8.33329 5.00002C8.33329 3.15907 6.84091 1.66669 4.99996 1.66669C3.15901 1.66669 1.66663 3.15907 1.66663 5.00002C1.66663 6.84097 3.15901 8.33335 4.99996 8.33335Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 18.3334C16.8409 18.3334 18.3333 16.841 18.3333 15C18.3333 13.1591 16.8409 11.6667 15 11.6667C13.159 11.6667 11.6666 13.1591 11.6666 15C11.6666 16.841 13.159 18.3334 15 18.3334Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default GridIcon
