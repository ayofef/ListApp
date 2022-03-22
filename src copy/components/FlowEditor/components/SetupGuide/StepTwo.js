import React from 'react';
import { Box } from '@material-ui/core';
import { P14 } from '../../../atoms';
import THEME from '../../../../constants/theme';
import { HighlightedText } from './styled';

const StepTwo = () => (
  <Box>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      After your Payment Instruct Automation is pubished, we need to set-up your checkout to call the WhenThen API and
      reference this Automation. This usually requires the help of a developer.
    </P14>
    <P14 margin="0 0 12px 0" color={THEME.greyColors.grey23}>
      <HighlightedText color={THEME.primaryColors.black}>Intent API Integration: </HighlightedText>
      Use the Intent API to help track your sales funnel, from when a customer begins the checkout process to payment
      completion. The benefit of using this API is that you can get rich insights on active and inactive checkout
      sessions, potentially lost payments, and failed payment attempts.
    </P14>
  </Box>
);

export default StepTwo;
