import IconProp from './IconType';
const SvgUserOutline = ({ size=24, ...props}: IconProp) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      {...props}
   >
      <path
         stroke="currentColor"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1.5}
         d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10M20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
      />
   </svg>
);
export default SvgUserOutline;
