import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import { BlockWrap } from '../temp-before-delete/BlockWrap';

const StyledDivider = styled(Divider)`
  ${({ color }) => color && `background-color: ${color}!important`};
`;

const CustomDivider = ({ fullWidth = false, margin = '24px 0', color, light }) => (
  <BlockWrap width={fullWidth ? '100%' : 'auto'} margin={margin}>
    <StyledDivider light={light} color={color} />
  </BlockWrap>
);
CustomDivider.propTypes = {
  fullWidth: bool,
  light: bool,
  margin: string,
  color: string,
};
CustomDivider.defaultProps = {
  fullWidth: false,
  margin: '31px 0',
  light: false,
  color: null,
};

export default CustomDivider;
