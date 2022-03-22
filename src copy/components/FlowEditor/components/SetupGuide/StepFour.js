import React from 'react';
import { Box } from '@material-ui/core';
import { P14 } from '../../../atoms';
import THEME from '../../../../constants/theme';

const StepFour = () => (
  <Box>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      Payments API Integration: use our Payments API to integrate with out vault and process payments
    </P14>
  </Box>
);

export default StepFour;
