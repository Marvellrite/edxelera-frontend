import * as React from 'react';
import type { SVGProps } from 'react';
const SvgVideoPlayBtn = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={84}
      height={84}
      fill="none"
      {...props}
   >
      <rect width={84} height={84} fill="#2C2C2C" fillOpacity={0.48} rx={42} />
      <path
         fill="#fff"
         d="M60.54 40.58a1.64 1.64 0 0 1 0 2.84L33.96 58.767a1.64 1.64 0 0 1-2.46-1.421v-30.69a1.64 1.64 0 0 1 2.46-1.42z"
      />
   </svg>
);
export default SvgVideoPlayBtn;
