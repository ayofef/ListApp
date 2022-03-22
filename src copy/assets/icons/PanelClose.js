import { number } from 'prop-types';
import React from 'react';

const PanelClose = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.75"
      y="-0.75"
      width="18.5"
      height="18.5"
      rx="6.75"
      transform="matrix(-1 0 0 1 21.5 3)"
      stroke="#787F88"
      strokeWidth="1.5"
    />
    <path d="M8.41846 15.4766V7.52335" stroke="#787F88" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
    <path
      d="M12.395 13.5879L10.3073 11.5002L12.395 9.41245"
      stroke="#787F88"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path d="M10.4067 11.5H16.3716" stroke="#787F88" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

PanelClose.propTypes = {
  size: number,
};
PanelClose.defaultProps = {
  size: 24,
};

export default PanelClose;
