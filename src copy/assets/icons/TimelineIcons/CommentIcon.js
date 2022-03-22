import React from 'react';
import { number } from 'prop-types';

const CommentIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#4E40EF" />
    <g clipPath="url(#clip0)">
      <path
        d="M10.5278 5.55554H5.47222C4.93528 5.55554 4.5 5.99082 4.5 6.52776V9.63887C4.5 10.1758 4.93528 10.6111 5.47222 10.6111H6.05556V11.9637C6.05556 11.967 6.05949 11.9687 6.062 11.9666L7.61111 10.6111H10.5278C11.0647 10.6111 11.5 10.1758 11.5 9.63887V6.52776C11.5 5.99082 11.0647 5.55554 10.5278 5.55554Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="9.33333" height="9.33333" fill="white" transform="translate(3.33337 4)" />
      </clipPath>
    </defs>
  </svg>
);

CommentIcon.propTypes = {
  size: number,
};

CommentIcon.defaultProps = {
  size: 16,
};

export default CommentIcon;
