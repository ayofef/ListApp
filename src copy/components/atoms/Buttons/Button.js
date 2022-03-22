import React from 'react';
import styled from 'styled-components';
import { bool, node, shape, string } from 'prop-types';

import THEME from '../../../constants/theme';
import CircularLoader from '../CircularLoader/CircularLoader';
import { borderStyling } from '../../../constants/CommonStyles';

const ButtonWrapper = styled.button`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: ${(filterBtn) => (filterBtn ? 'space-between ' : 'center')};
  align-content: center;
  font-family: NeurialGrotesk, sans-serif !important;
  align-items: center;
  text-decoration: none;
  background: ${({ $background, ghost, disabled, likeDisabled, transparent, white }) => {
    if ($background) {
      return $background;
    }
    if (ghost || likeDisabled) {
      return THEME.greyColors.grey5;
    }
    if (disabled) {
      return THEME.greyColors.grey4;
    }
    if (transparent) {
      return 'transparent';
    }
    if (white) {
      return 'white';
    }
    return THEME.primaryColors.primary;
  }};
  color: ${({ color, ghost, disabled, likeDisabled }) =>
    color || ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.white};
  font-weight: ${({ filterBtn }) => (filterBtn ? '700' : '500')};
  min-height: ${({ $minHeight, smaller, link }) => {
    if ($minHeight) {
      return $minHeight;
    }
    if (smaller) {
      return 40;
    }
    if (link) {
      return 0;
    }
    return 48;
  }}px;
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  ${({ height }) => (height ? `height: ${height}` : '')};
  font-size: ${({ fontSize, small, smaller }) => {
    if (fontSize) {
      return fontSize;
    }
    return small || smaller ? '14px' : '16px';
  }};
  padding: ${({ small, smaller, link, padding }) => {
    if (padding) {
      return padding;
    }
    if (link) {
      return '0';
    }
    if (small) {
      return '0px 12px;';
    }
    if (smaller) {
      return '0px 12px;';
    }
    return '0px 17px;';
  }};
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  cursor: ${({ disabled, cursor }) => {
    if (disabled) {
      return 'not-allowed';
    }
    if (cursor) {
      return cursor;
    }
    return 'pointer';
  }};
  margin: ${({ margin }) => margin || '0px'};
  svg circle {
    stroke: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.white}!important;
  }
  &.ghost {
    background: ${({ $background }) => $background || 'black'};
    border: 1px solid #e9e9e9;
    color: ${({ color }) => color || 'black'};
  }
  &.link {
    background: transparent;
    border: none;
    color: ${THEME.primaryColors.blue};
  }
  &.danger {
    background: ${THEME.secondaryColors.danger};
    border: 1px solid black;
    color: black;
  }
  &.secondary {
    background: ${THEME.designerColors.red};
    color: ${THEME.primaryColors.black};
    svg circle {
      stroke: ${THEME.primaryColors.black}!important;
    }
  }
  &.white {
    background: white;
    color: black;
    svg circle {
      stroke: black !important;
    }
  }
  &.blue {
    background: ${({ $background, ghost, disabled, likeDisabled }) => {
      if ($background) {
        return $background;
      }
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey4;
      }
      return THEME.primaryColors.blue;
    }};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.secondaryColors.black : THEME.primaryColors.white};
  }
  &.gradient {
    background: ${({ $background, ghost, disabled, likeDisabled }) => {
      if ($background) {
        return $background;
      }
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey4;
      }
      return 'linear-gradient(90deg, #BB7C8F 0%, #8672D3 26.41%, #686AF9 51.56%, #5740FA 77.27%, #4611F8 100%);';
      // return 'linear-gradient(90deg, #F58662 0%, #F59090 35.42%, #BA7FA1 70.31%, #8672D3 100%)'; // hover
    }};
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.secondaryColors.black : THEME.primaryColors.white};
    img,
    svg {
      position: absolute;
      right: 13px;
    }
  }
  &.grey {
    background: ${({ ghost, disabled, likeDisabled }) => {
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey4;
      }
      return THEME.greyColors.grey4;
    }};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.black};
  }
  &.grey-light {
    background: ${({ ghost, disabled, likeDisabled }) => {
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey5;
      }
      return THEME.greyColors.grey5;
    }};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.black};
  }
  &.pink {
    background: ${({ ghost, disabled, likeDisabled }) => {
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey4;
      }
      return THEME.designerColors.red;
    }};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.black};
  }
  & > svg {
    margin-left: ${({ smaller }) => (smaller ? 6 : 10)}px;
    margin-right: ${({ smaller }) => (smaller ? -4 : 0)}px;
  }
  &:focus {
    outline: none;
  }
  border: none;

  & p {
    text-decoration: none !important;
  }
  .MuiCircularProgress-root {
    margin-right: 8px;
  }
  ${borderStyling}
`;

const Button = ({ loading, children, ...props }) => (
  <ButtonWrapper {...props}>
    {loading && <CircularLoader size={20} />} {children}
  </ButtonWrapper>
);

Button.propTypes = {
  className: string,
  style: shape({}),
  loading: bool,
  ghost: bool,
  disabled: bool,
  likeDisabled: bool,
  transparent: bool,
  small: bool,
  smaller: bool,
  link: bool,
  children: node.isRequired,
  padding: string,
  color: string,
  fontSize: string,
  width: string,
  background: string,
  borderRadius: string,
  minHeight: string,
  margin: string,
};

Button.defaultProps = {
  className: undefined,
  style: undefined,
  loading: false,
  ghost: false,
  disabled: false,
  likeDisabled: false,
  transparent: false,
  small: false,
  smaller: false,
  link: false,
  padding: null,
  color: null,
  fontSize: null,
  width: undefined,
  background: undefined,
  borderRadius: undefined,
  minHeight: undefined,
  margin: undefined,
};

export default Button;
