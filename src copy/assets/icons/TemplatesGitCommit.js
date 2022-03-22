import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const TemplatesGitCommit = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99984 5.99984C6.89527 5.99984 5.99984 6.89527 5.99984 7.99984C5.99984 9.10441 6.89527 9.99984 7.99984 9.99984C9.10441 9.99984 9.99984 9.10441 9.99984 7.99984C9.99984 6.89527 9.10441 5.99984 7.99984 5.99984ZM4.6665 7.99984C4.6665 6.15889 6.15889 4.6665 7.99984 4.6665C9.84079 4.6665 11.3332 6.15889 11.3332 7.99984C11.3332 9.84079 9.84079 11.3332 7.99984 11.3332C6.15889 11.3332 4.6665 9.84079 4.6665 7.99984Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.0332031 8.00016C0.0332031 7.63197 0.33168 7.3335 0.69987 7.3335H4.66654C5.03473 7.3335 5.3332 7.63197 5.3332 8.00016C5.3332 8.36835 5.03473 8.66683 4.66654 8.66683H0.69987C0.33168 8.66683 0.0332031 8.36835 0.0332031 8.00016Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6733 8.00016C10.6733 7.63197 10.9718 7.3335 11.34 7.3335H15.3067C15.6749 7.3335 15.9733 7.63197 15.9733 8.00016C15.9733 8.36835 15.6749 8.66683 15.3067 8.66683H11.34C10.9718 8.66683 10.6733 8.36835 10.6733 8.00016Z"
      fill={color}
    />
  </svg>
);

TemplatesGitCommit.propTypes = {
  size: number,
  color: string,
};

TemplatesGitCommit.defaultProps = {
  size: 16,
  color: THEME.greyColors.grey17,
};

export default TemplatesGitCommit;
