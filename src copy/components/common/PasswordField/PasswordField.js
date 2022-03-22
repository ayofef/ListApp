import React from 'react';
import { bool, string } from 'prop-types';
import { InputField } from '../../atoms';

const PasswordField = ({ autoFocus = false, value, ...props }) => (
  <InputField {...props} autoFocus={autoFocus} type="password" value={value} />
);

PasswordField.propTypes = {
  showMask: bool,
  autoFocus: bool,
  value: string,
  hidePWDcheck: bool,
};

PasswordField.defaultProps = {
  showMask: true,
  autoFocus: false,
  value: '',
  hidePWDcheck: false,
};

export default PasswordField;
