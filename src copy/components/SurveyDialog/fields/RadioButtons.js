import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { StyledFormControlLabel } from '../styled';
import { Radio } from '../../atoms';

const RadioButtons = ({ name, options }) => {
  const [{ value, onChange }] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <FormControl component="fieldset" fullWidth disabled={isSubmitting}>
      <RadioGroup aria-label={name} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" size="small" />}
            label={option.title}
            name={name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RadioButtons;
