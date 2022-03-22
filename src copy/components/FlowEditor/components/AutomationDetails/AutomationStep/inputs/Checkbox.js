import React from 'react';
import { bool, func, string } from 'prop-types';
import { Checkbox as CheckboxAtom } from '../../../../../atoms';

const Checkbox = ({ name, checked, disabled, onChange }) => (
  <CheckboxAtom name={name} checked={checked} disabled={disabled} onChange={onChange} />
);

Checkbox.propTypes = {
  name: string.isRequired,
  checked: bool,
  disabled: bool,
  onChange: func,
};

Checkbox.defaultProps = {
  disabled: false,
  checked: undefined,
  onChange: undefined,
};

export default Checkbox;
