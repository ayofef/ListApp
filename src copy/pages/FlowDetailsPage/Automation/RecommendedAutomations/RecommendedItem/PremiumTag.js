import React from 'react';
import { StyledStarBox } from './styled';
import { Star } from '../../../../../assets/icons';
import THEME from '../../../../../constants/theme';

const PremiumTag = () => (
  <StyledStarBox>
    <Star size={14} color={THEME.primaryColors.primary} />
  </StyledStarBox>
);

export default PremiumTag;
