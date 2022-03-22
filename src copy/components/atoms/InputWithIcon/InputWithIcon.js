import React from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment } from '@material-ui/core';
import { arrayOf, func, node, oneOfType, string, bool } from 'prop-types';
import THEME from '../../../constants/theme';

const FieldWrapper = styled(TextField)`
  color: ${({ color }) => color || THEME.greyColors.grey2};
  > div {
    &:after,
    &:before {
      display: none;
    }
  }
`;

const InputWithIcon = ({ onChange, label, placeholder, position, children, shouldFullWidth, ...restProps }) => (
  <FieldWrapper
    {...restProps}
    label={label}
    placeholder={placeholder}
    onChange={onChange}
    fullWidth={shouldFullWidth}
    InputProps={{
      startAdornment: <InputAdornment position={position}>{children}</InputAdornment>,
    }}
  />
);

InputWithIcon.propTypes = {
  children: oneOfType([node, arrayOf(node)]).isRequired,
  onChange: func.isRequired,
  label: string,
  placeholder: string,
  position: string,
  shouldFullWidth: bool,
};

InputWithIcon.defaultProps = {
  label: '',
  placeholder: '',
  position: 'start',
  shouldFullWidth: false,
};

export default InputWithIcon;
