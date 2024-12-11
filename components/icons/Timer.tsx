import React, { forwardRef } from "react";

interface Props {
  color?: string;
  size?: number;
  [key: string]: any;
}

const Timer = forwardRef(
  (
    { color = "currentColor", size = 24, ...rest }: Props,
    ref: React.ForwardedRef<SVGSVGElement | null>
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        <line x1="10" x2="14" y1="2" y2="2" />
        <line x1="12" x2="15" y1="14" y2="11" />
        <circle cx="12" cy="14" r="8" />
      </svg>
    );
  }
);

Timer.displayName = "Timer";

export default Timer;
