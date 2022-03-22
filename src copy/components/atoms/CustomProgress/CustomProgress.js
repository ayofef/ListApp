import React from 'react';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

const LinearStyled = styled(LinearProgress)`
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5100;
`;

const CustomProgress = () => {
  return <LinearStyled />;
};

export default CustomProgress;
