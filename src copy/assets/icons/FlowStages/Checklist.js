import React from 'react';

const Checklist = () => {
  return (
    <svg width="328" height="64" viewBox="0 0 328 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="4" y="2" width="320" height="56" rx="6" fill="white" />
      </g>
      <rect x="26.5" y="22.5" width="15" height="15" rx="3.5" fill="white" stroke="#C1C3C6" />
      <path
        d="M31 29.6667L33.6667 32L37.3333 28"
        stroke="#C1C3C6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="284" y="18" width="24" height="24">
        <circle cx="296" cy="30" r="12" fill="#03363D" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="296" cy="30" r="12" fill="black" />
        <rect x="282" y="16" width="28" height="28" fill="#C1C3C6" />
      </g>
      <rect x="60" y="27" width="184" height="6" fill="#E6E9EC" />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="328"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default Checklist;
