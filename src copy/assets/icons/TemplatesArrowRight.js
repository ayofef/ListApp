import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const TemplatesArrowRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.6665 8.00016C2.6665 7.63197 2.96498 7.3335 3.33317 7.3335H12.6665C13.0347 7.3335 13.3332 7.63197 13.3332 8.00016C13.3332 8.36835 13.0347 8.66683 12.6665 8.66683H3.33317C2.96498 8.66683 2.6665 8.36835 2.6665 8.00016Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.52876 2.86177C7.78911 2.60142 8.21122 2.60142 8.47157 2.86177L13.1382 7.52843C13.3986 7.78878 13.3986 8.21089 13.1382 8.47124L8.47157 13.1379C8.21122 13.3983 7.78911 13.3983 7.52876 13.1379C7.26841 12.8776 7.26841 12.4554 7.52876 12.1951L11.724 7.99984L7.52876 3.80458C7.26841 3.54423 7.26841 3.12212 7.52876 2.86177Z"
      fill={color}
    />
  </svg>
);

TemplatesArrowRight.propTypes = {
  size: number,
  color: string,
};

TemplatesArrowRight.defaultProps = {
  size: 16,
  color: THEME.greyColors.grey17,
};

export default TemplatesArrowRight;
