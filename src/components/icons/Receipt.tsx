import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Receipt = ({ size = 20, ...props }: Props) => {
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
        d="M18.3334 4.99996V7.01662C18.3334 8.33329 17.5 9.16663 16.1834 9.16663H13.3334V3.34162C13.3334 2.41662 14.0917 1.66663 15.0167 1.66663C15.925 1.67496 16.7584 2.04162 17.3584 2.64162C17.9584 3.24996 18.3334 4.08329 18.3334 4.99996Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66663 5.83329V17.5C1.66663 18.1916 2.44996 18.5833 2.99996 18.1666L4.42496 17.1C4.75829 16.85 5.22496 16.8833 5.52496 17.1833L6.90829 18.575C7.23329 18.9 7.76663 18.9 8.09163 18.575L9.49163 17.175C9.78329 16.8833 10.25 16.85 10.575 17.1L12 18.1666C12.55 18.575 13.3333 18.1833 13.3333 17.5V3.33329C13.3333 2.41663 14.0833 1.66663 15 1.66663H5.83329H4.99996C2.49996 1.66663 1.66663 3.15829 1.66663 4.99996V5.83329Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.20837 8.33337H9.79171"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Receipt;