import React from 'react';
import { number, string } from 'prop-types';
import THEME from '../../constants/theme';

const TemplatesGrid = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.3335 2.00016C1.3335 1.63197 1.63197 1.3335 2.00016 1.3335H6.66683C7.03502 1.3335 7.3335 1.63197 7.3335 2.00016V6.66683C7.3335 7.03502 7.03502 7.3335 6.66683 7.3335H2.00016C1.63197 7.3335 1.3335 7.03502 1.3335 6.66683V2.00016ZM2.66683 2.66683V6.00016H6.00016V2.66683H2.66683Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.6665 2.00016C8.6665 1.63197 8.96498 1.3335 9.33317 1.3335H13.9998C14.368 1.3335 14.6665 1.63197 14.6665 2.00016V6.66683C14.6665 7.03502 14.368 7.3335 13.9998 7.3335H9.33317C8.96498 7.3335 8.6665 7.03502 8.6665 6.66683V2.00016ZM9.99984 2.66683V6.00016H13.3332V2.66683H9.99984Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.6665 9.33317C8.6665 8.96498 8.96498 8.6665 9.33317 8.6665H13.9998C14.368 8.6665 14.6665 8.96498 14.6665 9.33317V13.9998C14.6665 14.368 14.368 14.6665 13.9998 14.6665H9.33317C8.96498 14.6665 8.6665 14.368 8.6665 13.9998V9.33317ZM9.99984 9.99984V13.3332H13.3332V9.99984H9.99984Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.3335 9.33317C1.3335 8.96498 1.63197 8.6665 2.00016 8.6665H6.66683C7.03502 8.6665 7.3335 8.96498 7.3335 9.33317V13.9998C7.3335 14.368 7.03502 14.6665 6.66683 14.6665H2.00016C1.63197 14.6665 1.3335 14.368 1.3335 13.9998V9.33317ZM2.66683 9.99984V13.3332H6.00016V9.99984H2.66683Z"
      fill={color}
    />
  </svg>
);

TemplatesGrid.propTypes = {
  size: number,
  color: string,
};

TemplatesGrid.defaultProps = {
  size: 16,
  color: THEME.greyColors.grey17,
};

export default TemplatesGrid;
