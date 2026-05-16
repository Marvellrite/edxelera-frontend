import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFlash = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      fill="none"
      {...props}
   >
      <path
         fill="currentColor"
         d="M26.865 16.08H22.23V5.28c0-2.52-1.365-3.03-3.03-1.14L18 5.505 7.845 17.055c-1.395 1.575-.81 2.865 1.29 2.865h4.635v10.8c0 2.52 1.365 3.03 3.03 1.14l1.2-1.365 10.155-11.55c1.395-1.575.81-2.865-1.29-2.865"
      />
   </svg>
);
export default SvgFlash;
