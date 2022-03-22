import React from 'react';
import styled from 'styled-components';
import { func, node, number, string } from 'prop-types';
import THEME from '../../../constants/theme';

const StyledIconButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  width: ${({ $width }) => $width || '40px'};
  height: ${({ $height }) => $height || '40px'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  cursor: pointer;

  svg {
    color: ${({ $color }) => $color || THEME.greyColors.grey1};
    font-size: ${({ $fontSize }) => $fontSize || '20px'};
    stroke: ${THEME.greyColors.grey1};
    stroke-width: ${({ $strokeWidth }) => $strokeWidth || '2px'};
  }

  &:hover {
    background-color: ${({ activeColor }) => activeColor || THEME.greyColors.grey12};
  }
`;

const RoundedIconButton = ({ onClick, Icon, width, height, strokeWidth, color, fontSize }) => (
  <StyledIconButton
    type="button"
    onClick={onClick}
    $width={width}
    $height={height}
    $strokeWidth={strokeWidth}
    $color={color}
    $fontSize={fontSize}
  >
    <Icon />
  </StyledIconButton>
);

RoundedIconButton.propTypes = {
  onClick: func.isRequired,
  Icon: node.isRequired,
  width: string,
  height: string,
  strokeWidth: number,
  color: string,
  fontSize: string,
};

RoundedIconButton.defaultProps = {
  color: THEME.greyColors.grey17,
  width: '40px',
  height: '40px',
  strokeWidth: 0,
  fontSize: '20px',
};

export default RoundedIconButton;
