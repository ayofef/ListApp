import React from 'react';
import { Box } from '@material-ui/core';
import { P14 } from '../../../atoms';
import THEME from '../../../../constants/theme';

const StepOne = () => (
  <Box>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      Welcome to your Payment Instruct Automation. Create sophisticated payment flows using the condition and action
      nodes in this no-code canvas to define how and when you want to process your payments.
    </P14>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      Use our recipes library to find pre-packaged nodes that level-up your payment operations to do things like
      increase acceptance, reduce fraud and reduce processing costs.
    </P14>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      When you’re happy with your Payment Instruct Flow, select Start and we’ll guide you through the necessary
      integrations to make it work with your checkout
    </P14>
  </Box>
);

export default StepOne;
