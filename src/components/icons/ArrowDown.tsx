import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
   >
      <path
         stroke="#2C2C2C"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeMiterlimit={10}
         d="m13.28 5.967-4.346 4.347a1.324 1.324 0 0 1-1.867 0L2.72 5.966"
      />
   </svg>
);
export default SvgArrowDown;
