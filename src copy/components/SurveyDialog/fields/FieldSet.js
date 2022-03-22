import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { StyledFormControlLabel } from '../styled';
import { Checkbox } from '../../atoms';

const FieldSet = ({ name, options }) => {
  const [{ value, onChange }] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <FormControl component="fieldset" fullWidth disabled={isSubmitting}>
      <FormGroup aria-label={name} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option?.value}
            value={option?.value}
            checked={value?.includes(option?.value)}
            control={<Checkbox />}
            label={option.title}
            name={name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

FieldSet.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FieldSet;
