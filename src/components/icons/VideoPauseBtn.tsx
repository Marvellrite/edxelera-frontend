import * as React from 'react';
import type { SVGProps } from 'react';
const SvgVideoPauseBtn = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...props}
   >
      <path
         fill="#fff"
         d="M7.988 14.333V3.668c0-1.013-.428-1.418-1.508-1.418H3.757c-1.08 0-1.507.405-1.507 1.418v10.664c0 1.013.428 1.418 1.507 1.418H6.48c1.08 0 1.507-.405 1.507-1.418M15.75 14.333V3.668c0-1.013-.428-1.418-1.508-1.418H11.52c-1.072 0-1.508.405-1.508 1.418v10.664c0 1.013.428 1.418 1.508 1.418h2.723c1.08 0 1.507-.405 1.507-1.418"
      />
   </svg>
);
export default SvgVideoPauseBtn;
