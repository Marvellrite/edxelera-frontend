import * as React from 'react';
import type { SVGProps } from 'react';
const SvgVideoExpandBtn = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
   >
      <path
         fill="#fff"
         d="M10.72 7.28a.75.75 0 0 1 0-1.06L13.94 3H12a.75.75 0 1 1 0-1.5h3.75a.75.75 0 0 1 .75.75V6A.75.75 0 1 1 15 6V4.06l-3.22 3.22a.75.75 0 0 1-1.06 0M2.25 16.5H6A.75.75 0 1 0 6 15H4.06l3.22-3.22a.75.75 0 0 0-1.06-1.06L3 13.94V12a.75.75 0 1 0-1.5 0v3.75a.75.75 0 0 0 .75.75"
      />
   </svg>
);
export default SvgVideoExpandBtn;
