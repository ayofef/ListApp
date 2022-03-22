import { number } from 'prop-types';
import React from 'react';

const WhenThen = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <circle cx="12" cy="12" r="12" fill="#03363D" />
    </mask>
    <g mask="url(#mask0)">
      <circle cx="12" cy="12" r="12" fill="#1F25F3" />
      <path
        d="M11.5179 9.65069H11.5562L12.5631 5.70001H14.2028L12.5535 12H10.7411L9.68635 8.02055H9.64799L8.60279 12H6.81923L5.16992 5.70001H6.86718L7.87402 9.65069H7.91238L8.94799 5.70001H10.4822L11.5179 9.65069Z"
        fill="white"
      />
      <path d="M15.7563 19V14.1H13.5988V12.7H19.6302V14.1H17.444V19H15.7563Z" fill="white" />
    </g>
  </svg>
);

WhenThen.propTypes = {
  size: number,
};

WhenThen.defaultProps = {
  size: 24,
};

export default WhenThen;
