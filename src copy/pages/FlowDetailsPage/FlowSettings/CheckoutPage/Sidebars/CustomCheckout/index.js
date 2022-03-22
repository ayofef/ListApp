import React from 'react';

import { StyledWrapper } from './styled';
import DeveloperGuidance from './DeveloperGuidance';
import NeedHelpCTA from './NeedHelpCTA';

const CustomCheckout = () => {
  return (
    <StyledWrapper boxSizing="border-box" width="336px">
      <DeveloperGuidance />
      <NeedHelpCTA />
    </StyledWrapper>
  );
};

export default CustomCheckout;
