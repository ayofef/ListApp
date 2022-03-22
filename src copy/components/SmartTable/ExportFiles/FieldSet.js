import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { FormGroup } from '@material-ui/core';
import { StyledFormControlLabel } from './styled';
import { Checkbox } from '../../atoms';

const FieldSet = ({ columnSet }) => {
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange }] = useField('columns');
  const options = useMemo(
    () =>
      columnSet
        .map((column) => ({
          value: column.name,
          title: column.label,
        }))
        ?.sort((a, b) => a?.title?.length - b?.title?.length),
    [columnSet]
  );
  return (
    <Box my="16px">
      <FormControl component="fieldset" fullWidth>
        <FormGroup row>
          {options.map((option) => (
            <Box key={option.value} pl="10px" my="3px" width={1 / 3}>
              <StyledFormControlLabel
                key={option.value}
                value={option.value}
                disabled={isSubmitting}
                control={
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={value.includes(option.value)}
                    onChange={onChange}
                    name="columns"
                  />
                }
                label={
                  <Box ml="6px" fontSize="14px" mt="2px">
                    {option.title}
                  </Box>
                }
              />
            </Box>
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

FieldSet.propTypes = {
  columnSet: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, isDefault: PropTypes.bool.isRequired })
  ).isRequired,
};

export default FieldSet;
