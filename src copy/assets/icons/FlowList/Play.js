import React from 'react';

const Play = () => {
  return (
    <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd)">
        <circle cx="54" cy="44" r="40" fill="#4E40EF" />
      </g>
      <path
        d="M49.0774 51C48.4309 51 48 50.5247 48 49.7815V38.2185C48 37.4753 48.4309 37 49.0774 37C49.4275 37 49.7148 37.121 50.0829 37.3197L60.0214 42.8593C60.7396 43.2568 61 43.542 61 44C61 44.458 60.7396 44.7432 60.0214 45.1407L50.0829 50.6802C49.7148 50.879 49.4275 51 49.0774 51Z"
        stroke="white"
        strokeWidth="2"
      />
      <defs>
        <filter
          id="filter0_dd"
          x="0"
          y="0"
          width="108"
          height="108"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default Play;
