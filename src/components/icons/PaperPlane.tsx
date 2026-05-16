import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPaperPlane = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="none"
      {...props}
   >
      <g clipPath="url(#paper-plane_svg__a)">
         <path
            fill="#D62829"
            d="M13.597 24.076c-.514-.206-.72-.823-.514-1.338.205-.514.823-.72 1.337-.514l6.276 2.675 1.955.823c.206.103.515.206.823.206.412 0 .72-.103 1.03-.309.514-.309.925-.926 1.028-1.543l1.75-21.401c.102-.72-.31-1.44-.927-1.852S24.915.41 24.297.72L1.045 12.964c-.72.411-1.132 1.132-1.03 1.955 0 .823.515 1.44 1.235 1.749l8.643 3.6v6.174c0 .823.514 1.646 1.337 1.955.206.103.515.103.72.103.618 0 1.133-.206 1.544-.72l2.47-2.881z"
         />
      </g>
      <defs>
         <clipPath id="paper-plane_svg__a">
            <path fill="#fff" d="M0 0h28v28H0z" />
         </clipPath>
      </defs>
   </svg>
);
export default SvgPaperPlane;
