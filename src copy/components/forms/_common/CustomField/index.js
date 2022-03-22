import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { StyledInput, StyledInputLabel } from './styled';

const CustomField = ({ name, type, label, placeholder, fullWidth }) => {
  const { isSubmitting } = useFormikContext();
  const [fieldProps, { touched, error }] = useField(name);
  const hasError = Boolean(touched && error);

  return (
    <FormControl error={hasError} fullWidth={fullWidth}>
      {label && (
        <StyledInputLabel htmlFor={name} shrink>
          {label}
        </StyledInputLabel>
      )}

      <StyledInput id={name} {...fieldProps} type={type} placeholder={placeholder} disabled={isSubmitting} />

      {hasError && <FormHelperText id={name}>{error}</FormHelperText>}
    </FormControl>
  );
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
};

CustomField.defaultProps = {
  type: 'text',
  label: null,
  placeholder: 'Enter value',
  fullWidth: false,
};

export default CustomField;
