import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { StyledWrapper } from './styled';

const FlowListSkeleton = () => (
  <StyledWrapper>
    <Skeleton variant="rect" height={1000} width="100%" />
  </StyledWrapper>
);

export default FlowListSkeleton;
