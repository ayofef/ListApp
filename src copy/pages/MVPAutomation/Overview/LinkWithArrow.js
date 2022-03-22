import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { func, string } from 'prop-types';
import THEME from '../../../constants/theme';
import { L14M } from '../../../components/atoms';

const Wrapper = styled(Box)`
  cursor: pointer;
  & .MuiSvgIcon-root {
    color: ${THEME.primaryColors.primary};
  }
`;

const LinkWithArrow = ({ title, onClick }) => (
  <Wrapper display="flex" alignItems="center" onClick={onClick}>
    <L14M color={THEME.primaryColors.primary}>{title}</L14M>
    <Box fontSize="8px" ml="12px">
      <ArrowForwardIosIcon fontSize="inherit" />
    </Box>
  </Wrapper>
);

LinkWithArrow.propTypes = {
  title: string.isRequired,
  onClick: func.isRequired,
};

export default LinkWithArrow;
