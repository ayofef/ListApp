import React from 'react';
import { Box } from '@material-ui/core';
import { P14 } from '../../../atoms';
import THEME from '../../../../constants/theme';
import { HighlightedText } from './styled';

const StepThree = () => (
  <Box>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      <HighlightedText $fontWeight={500}>Checkout API Integration:</HighlightedText> leverage client SDKs that can be
      customised, branded, and securely captures payment information.
    </P14>
  </Box>
);

export default StepThree;
