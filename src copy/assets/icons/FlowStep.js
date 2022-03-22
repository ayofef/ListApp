import { number, string } from 'prop-types';
import React from 'react';

const FlowStep = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.5" y="0.5" width="13" height="17" rx="3.5" stroke={color} />
    <circle cx="5.5" cy="14.5" r="5" fill="white" stroke={color} />
    <line x1="5.5" y1="17" x2="5.5" y2="12" stroke={color} />
    <line x1="3" y1="14.5" x2="8" y2="14.5" stroke={color} />
  </svg>
);

FlowStep.propTypes = {
  color: string,
  size: number,
};

FlowStep.defaultProps = {
  color: '#FF5A87',
  size: 24,
};

export default FlowStep;
