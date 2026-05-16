import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSuccesstoaster = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
   >
      <path
         fill="#005827"
         d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12"
      />
      <g clipPath="url(#success_toaster_svg__a)">
         <path
            fill="#fff"
            d="m17.18 8.198-6.733 6.785-3.049-3.536-.745.643 3.744 4.342 7.482-7.54z"
         />
      </g>
      <defs>
         <clipPath id="success_toaster_svg__a">
            <path
               fill="#fff"
               d="m7.742 5.918 10.34 1.823-1.823 10.34-10.34-1.823z"
            />
         </clipPath>
      </defs>
   </svg>
);
export default SvgSuccesstoaster;
