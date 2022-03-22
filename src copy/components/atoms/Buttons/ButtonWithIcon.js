import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import noop from 'lodash/noop';
import { bool, func, node, string } from 'prop-types';
import THEME from '../../../constants/theme';

const StyledButton = styled(Box)`
  display: flex;
  align-items: center;
  background: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 6px;
  cursor: pointer;
  color: ${THEME.primaryColors.black};
  user-select: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ $hoverColor, $backgroundColor }) => $hoverColor || $backgroundColor};
  }
`;

const ButtonWithIcon = ({ startIcon, endIcon, text, bgColor, onClick, disabled, ...restProps }) => (
  <StyledButton onClick={disabled ? noop : onClick} p="10px" $backgroundColor={bgColor} {...restProps}>
    {startIcon && (
      <Box display="flex" alignItems="center" mr="8px">
        {startIcon}
      </Box>
    )}
    {text}
    {endIcon && (
      <Box display="flex" alignItems="center" ml="8px">
        {endIcon}
      </Box>
    )}
  </StyledButton>
);

ButtonWithIcon.propTypes = {
  startIcon: node,
  endIcon: node,
  text: string.isRequired,
  bgColor: string,
  onClick: func.isRequired,
  disabled: bool,
};

ButtonWithIcon.defaultProps = {
  startIcon: null,
  endIcon: null,
  bgColor: THEME.greyColors.grey12,
  disabled: false,
};

export default ButtonWithIcon;
