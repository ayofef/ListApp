import React from 'react';

const LeftBlock = () => {
  return (
    <svg width="170" height="24" viewBox="0 0 170 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <circle cx="12" cy="12" r="12" fill="#03363D" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="12" cy="12" r="12" fill="#E6E9EC" />
        <rect x="7" y="10" width="10" height="4" fill="#C1C3C6" />
      </g>
      <rect x="39" y="10" width="131" height="4" fill="#E6E9EC" />
    </svg>
  );
};

const RightBlock = () => (
  <svg width="50" height="16" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="6" width="26" height="4" fill="#E6E9EC" />
    <rect width="16" height="16" rx="3" transform="matrix(1 0 0 -1 34 16)" fill="#E6E9EC" />
  </svg>
);

export { LeftBlock, RightBlock };
