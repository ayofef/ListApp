import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import isEmpty from 'lodash/isEmpty';
import InputField from '../../atoms/Input';
import ErrorMessage from '../ErrorMessage';

function FormInput({ name, ...rest }) {
  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);

  return (
    <Box>
      <InputField
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        onBlur={onBlur}
        fullWidth
        {...rest}
      />
      {touched && !isEmpty(error) && <ErrorMessage message={error} margin="4px 0 0 0" />}
    </Box>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormInput;
