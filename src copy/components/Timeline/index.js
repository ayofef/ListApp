import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import THEME from '../../constants/theme';

export const SIZE = 7;
export const LEFT = 13;
export const TOP = 10;
export const GAP = 8;
export const MARGIN_TOP = 17;

const LI = styled(({ markColor, iconSize, ...props }) => <li {...props} />)`
  position: relative;
  margin-top: ${MARGIN_TOP}px;
  background: ${THEME.greyColors.grey12};

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 1px;
    top: 20px;
    bottom: -14px;
    left: -${LEFT + Math.ceil(SIZE / 2)}px;
    background-color: #e3e5e9;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`;

LI.propTypes = {
  markColor: PropTypes.string,
};

LI.defaultProps = {
  markColor: '#e3e5e9',
};

const UL = styled.ul`
  margin: 0;
  ${({ addMargin }) => (addMargin && 'margin-top: 32px;') || ''};
  padding-left: 0;
  list-style: none;
`;

export { UL, LI };
