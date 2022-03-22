import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormHelperText from '@material-ui/core/FormHelperText';
import { StyledInput, StyledInputLabel } from '../CustomField/styled';

const CustomSelect = ({ name, label, fullWidth, children }) => {
  const { isSubmitting } = useFormikContext();
  const [fieldProps, { touched, error }] = useField(name);
  const hasError = Boolean(touched && error);

  return (
    <FormControl fullWidth={fullWidth}>
      {label && (
        <StyledInputLabel htmlFor={name} shrink>
          {label}
        </StyledInputLabel>
      )}

      <Select id={name} {...fieldProps} disabled={isSubmitting} input={<StyledInput />} IconComponent={ExpandMoreIcon}>
        {children}
      </Select>

      {hasError && <FormHelperText id={name}>{error}</FormHelperText>}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

CustomSelect.defaultProps = {
  label: null,
  fullWidth: false,
};

export default CustomSelect;
