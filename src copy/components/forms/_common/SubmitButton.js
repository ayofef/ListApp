import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';
import { useFormikContext } from 'formik';
import THEME from '../../../constants/theme';
import { CircularLoader } from '../../atoms';

const StyledButton = styled.button`
  position: relative;
  font-size: 14px;
  padding: 16px 32px;
  width: 100%;
  color: #fff;
  border-radius: 6px;
  text-align: center;
  position: relative;
  outline: none;
  border: none;
  font-weight: 700;
  z-index: 10;
  overflow: hidden;
  cursor: pointer;
  /* margin: 44px 0 0 0; */
  span {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-44%);
    ${({ $isLoading }) =>
      !$isLoading &&
      css`
        svg {
          width: 20px;
          height: 20px;
        }
      `};
  }

  //Show Icon Styles
  background-image: url('/SignUpButtonBg.png');
  background-repeat: no-repeat;
  background-size: 120% 130%;
  background-position: center;
  transition: opacity 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  &:hover,
  &:active {
    opacity: 0.85;
  }

  ${({ $showIcon }) =>
    !$showIcon &&
    css`
      background: transparent;

      :before {
        content: '';
        position: absolute;
        transition: opacity 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }

      :before {
        background: ${THEME.gradient};
      }

      :hover:before,
      :active:before {
        opacity: 0.85;
      }
    `};
`;

const SubmitButton = ({ children, icon, showIcon, isLoading, ...restProps }) => {
  const formik = useFormikContext();
  const loading = formik?.isSubmitting || isLoading;
  return (
    <StyledButton
      type="submit"
      disabled={formik?.isSubmitting}
      $showIcon={showIcon}
      $isLoading={loading}
      {...restProps}
    >
      {children}
      <span>
        {!loading && showIcon && (icon || <ArrowForwardIcon />)}
        {loading && <CircularLoader bgcolor="#fff" size="16px" thickness={5} />}
      </span>
    </StyledButton>
  );
};
SubmitButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
  showIcon: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
SubmitButton.defaultProps = {
  label: undefined,
  isLoading: false,
  icon: undefined,
  showIcon: true,
  children: null,
};

export default SubmitButton;
