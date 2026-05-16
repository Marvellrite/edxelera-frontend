import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPlay = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={20}
      fill="none"
      {...props}
   >
      <path
         fill="#040506"
         d="M16.521 12.48c1.958-1.13 1.958-3.957 0-5.087L4.406.398C2.448-.732 0 .68 0 2.94v13.99c0 2.26 2.448 3.674 4.406 2.543z"
      />
   </svg>
);
export default SvgPlay;
