import PropTypes from 'prop-types';
import React from 'react';

import { InputField } from '../atoms';

const PLACEHOLDER = 'john@example.com';

const Input = ({ field }) => {
  return (
    <InputField
      margin="0 0 8px 0"
      name="name"
      label=""
      type="text"
      variant="outlined"
      placeholder={PLACEHOLDER}
      {...field}
    />
  );
};

Input.propTypes = {
  field: PropTypes.shape({
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default Input;
