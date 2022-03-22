import React, { useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import { StyledRadio, StyledFormControlLabel } from './styled';

const RADIOS = [
  {
    value: 'default',
    label: 'Use the email address you signed up to Whenthen with as your default address.',
    help: 'if User chooses default address, it is automatically populated.',
  },
  {
    value: 'custom',
    label: 'Set up a custom email address.',
    help: 'if company has a shared email address.',
  },
];

const TypeField = () => {
  const { isSubmitting } = useFormikContext();
  const [{ value: fieldValue }, , { setValue }] = useField('type');

  const onChange = useCallback(
    ({ target }) => {
      setValue(target.value);
    },
    [setValue]
  );

  return (
    <RadioGroup aria-label="name-action" name="type" value={fieldValue} onChange={onChange}>
      {RADIOS.map(({ value, label, help }) => (
        <Box key={value}>
          <StyledFormControlLabel
            value={value}
            control={<StyledRadio color="primary" size="small" />}
            label={
              <Box component="span" display="block" fontWeight="600" color="#000">
                {label}
              </Box>
            }
            disabled={isSubmitting}
          />

          <Box component="p" m="8px 0 16px" pl="27px" color="#787F88">
            {help}
          </Box>
        </Box>
      ))}
    </RadioGroup>
  );
};

export default TypeField;
