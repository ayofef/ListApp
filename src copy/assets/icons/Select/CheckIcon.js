import React from 'react';
import { string } from 'prop-types';

const CheckIcon = ({ stroke }) => {
  return (
    <svg
      className="check-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7.55572L7.55556 10.6668L12.4444 5.3335"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CheckIcon.propTypes = {
  stroke: string,
};

CheckIcon.defaultProps = {
  stroke: '#4E40EF',
};

export default CheckIcon;
