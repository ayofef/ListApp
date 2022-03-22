import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl } from '@material-ui/core';

import { SWATCH_COLORS } from './colors';
import InputGroup from '../InputGroupRadio/InputGroup';
import { StyledRadioGroup } from './styled';

const Swatches = ({ handleChange }) => {
  return (
    <FormControl component="fieldset">
      <StyledRadioGroup
        aria-label="button-style"
        name="button-style"
        defaultValue="thin"
        onChange={(e) => handleChange(e.target.value)}
      >
        {SWATCH_COLORS.map(({ id, color1, color2, color3 }) => (
          <Box display="flex" flexDirection="column" key={id}>
            <InputGroup value={color1} color={color1} control={0} />
            <InputGroup value={color2} color={color2} control={0} />
            <InputGroup value={color3} color={color3} control={0} />
          </Box>
        ))}
      </StyledRadioGroup>
    </FormControl>
  );
};

Swatches.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Swatches;
