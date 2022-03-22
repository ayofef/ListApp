import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '../../../../components/atoms';

const Fieldset = ({ name, value, options, disabled, onChange }) => (
  <Box p="8px 10px" borderRadius="4px">
    <FormControl component="fieldset" fullWidth>
      {options.map((option) => (
        <Box key={option.value} marginY="4px" ml="-5.5px">
          <FormControlLabel
            value={option.value}
            disabled={disabled}
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={value.includes(option?.value)}
                onChange={onChange}
                name={name}
              />
            }
            label={
              <Box ml="16px" fontSize="13px" mt="2px">
                {option.title}
              </Box>
            }
          />
        </Box>
      ))}
    </FormControl>
  </Box>
);

Fieldset.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Fieldset.defaultProps = {
  disabled: false,
};

export default React.memo(Fieldset);
