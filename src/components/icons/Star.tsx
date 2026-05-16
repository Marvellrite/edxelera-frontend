import * as React from 'react';
import type { SVGProps } from 'react';
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="-0.5 -0.5 11 11"
      {...props}
   >
      <path d="m6.246.765.94 1.88c.127.26.467.507.754.56l1.7.28c1.086.18 1.34.967.56 1.753L8.873 6.565c-.22.22-.347.653-.273.967l.38 1.64c.3 1.293-.394 1.8-1.534 1.12l-1.593-.947c-.287-.173-.767-.173-1.053 0l-1.594.947c-1.14.673-1.833.173-1.533-1.12l.38-1.64c.073-.307-.053-.74-.273-.967L.453 5.238c-.78-.78-.527-1.566.56-1.753l1.7-.28c.287-.047.627-.3.753-.56l.94-1.88c.5-1.02 1.327-1.02 1.84 0" />
   </svg>
);
export default SvgStar;
