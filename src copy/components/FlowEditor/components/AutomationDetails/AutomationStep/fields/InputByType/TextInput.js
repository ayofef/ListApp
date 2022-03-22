import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { StyledFormControl } from '../Condition/styled';

const TextInput = ({ name, value, onChange }) => (
  <StyledFormControl fullWidth>
    <Input name={name} value={value} onChange={onChange} />
  </StyledFormControl>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
