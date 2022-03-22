import styled from 'styled-components';
import { bool } from 'prop-types';
import THEME from '../../../constants/theme';

export const LikeButton = styled.div`
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  font-family: NeurialGrotesk, sans-serif !important;
  align-items: center;
  white-space: nowrap;
  background: ${({ ghost, disabled, likeDisabled }) =>
    ghost || disabled || likeDisabled ? THEME.greyColors.grey5 : THEME.primaryColors.main};
  color: ${({ ghost, disabled, likeDisabled }) =>
    ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.white};
  font-weight: 500;
  min-height: ${({ smaller }) => (smaller ? 40 : 48)}px;
  max-height: ${({ smaller }) => (smaller ? 40 : 48)}px;
  font-size: ${({ small, smaller }) => (small || smaller ? 14 : 16)}px;
  padding: ${({ small, smaller }) => {
    if (small) {
      return '0px 12px;';
    }
    if (smaller) {
      return '0px 12px;';
    }
    return '0px 17px;';
  }};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin: ${({ margin }) => margin || '0'};
  svg circle {
    stroke: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.white}!important;
  }
  &.secondary {
    background: ${THEME.secondaryColors.pink};
    color: ${THEME.primaryColors.black};
    svg circle {
      stroke: ${THEME.primaryColors.black}!important;
    }
  }
  &.blue {
    background: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.greyColors.grey5 : THEME.secondaryColors.blue};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.secondaryColors.blue : THEME.primaryColors.white};
  }
  &.pink {
    background: ${({ ghost, disabled, likeDisabled }) => {
      if (ghost || likeDisabled) {
        return THEME.greyColors.grey5;
      }
      if (disabled) {
        return THEME.greyColors.grey4;
      }
      return THEME.secondaryColors.pink;
    }};
    color: ${({ ghost, disabled, likeDisabled }) =>
      ghost || disabled || likeDisabled ? THEME.primaryColors.black : THEME.primaryColors.black};
  }
  & > svg {
    margin-left: 10px;
  }
  &:focus {
    outline: none;
  }
  border: none;
`;

LikeButton.propTypes = {
  ghost: bool,
  disabled: bool,
  likeDisabled: bool,
  small: bool,
  smaller: bool,
};

LikeButton.defaultProps = {
  ghost: false,
  disabled: false,
  likeDisabled: false,
  small: false,
  smaller: false,
};
