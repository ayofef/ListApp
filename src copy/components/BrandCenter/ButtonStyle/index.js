import React from 'react';
import PropTypes from 'prop-types';
import { Box, RadioGroup, FormControl } from '@material-ui/core';
import InputGroup from '../InputGroupRadio/InputGroup';

const ButtonStyleSection = ({ handleChange, color, defaultValue }) => {
  const accentColor = color || '#777777';
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="button-style"
        name="button-style"
        defaultValue={defaultValue || 'SOLID'}
        onChange={handleChange}
      >
        <Box mb="24px">
          <InputGroup value="SOLID" color={accentColor} />
          <InputGroup value="SOLID_ROUND" color={accentColor} />
        </Box>
        <Box>
          <InputGroup value="THIN" color={accentColor} />
          <InputGroup value="THIN_ROUND" color={accentColor} />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

ButtonStyleSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default ButtonStyleSection;
