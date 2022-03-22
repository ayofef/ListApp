import React from 'react';
import { string } from 'prop-types';

const StarGreenBg = ({ className }) => (
  <svg className={className} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_4516_3924)">
      <circle cx="26" cy="16" r="12" fill="#1CCE6A" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26 20L23.2771 21.4316C22.9512 21.6029 22.5481 21.4776 22.3768 21.1517C22.3085 21.0219 22.285 20.8733 22.3098 20.7288L22.8298 17.6968L20.6269 15.5495C20.3633 15.2925 20.3579 14.8704 20.6149 14.6068C20.7172 14.5018 20.8513 14.4334 20.9964 14.4124L24.0407 13.97L25.4022 11.2114C25.5651 10.8812 25.9649 10.7456 26.295 10.9086C26.4265 10.9735 26.5329 11.0799 26.5978 11.2114L27.9593 13.97L31.0036 14.4124C31.368 14.4653 31.6204 14.8036 31.5675 15.168C31.5464 15.3131 31.4781 15.4471 31.3731 15.5495L29.1702 17.6968L29.6902 20.7288C29.7525 21.0917 29.5087 21.4363 29.1458 21.4986C29.0013 21.5233 28.8527 21.4998 28.7229 21.4316L26 20Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_dd_4516_3924"
        x="0"
        y="0"
        width="52"
        height="52"
        filterUnits="userSpaceOnUse"
        colorInterpolation-filters="sRGB"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4516_3924" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_4516_3924" result="effect2_dropShadow_4516_3924" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_4516_3924" result="shape" />
      </filter>
    </defs>
  </svg>
);

StarGreenBg.propTypes = {
  className: string,
};

StarGreenBg.defaultProps = {
  className: '',
};

export default StarGreenBg;
