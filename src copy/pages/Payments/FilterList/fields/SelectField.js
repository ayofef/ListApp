import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';

import { useField, useFormikContext } from 'formik';
import { StyledSelect } from '../../../../components/atoms';

const SelectField = ({ options, name }) => {
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange }] = useField(name);

  return (
    <Box>
      <StyledSelect
        margin="4px 0 8px 0"
        value={value}
        onChange={onChange}
        options={options}
        name={name}
        disabled={isSubmitting}
        filter={1}
        backgroundColor="#fff"
        hoverbg="#fff"
      />
    </Box>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.shape({
        text: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default SelectField;
