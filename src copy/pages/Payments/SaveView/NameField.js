import React, { useCallback, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Box, capitalize } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Radio } from '../../../components/atoms';
import { StyledFormControlLabel } from '../../../components/forms/_common/styled';
import { StyledTextField } from './styled';

const RADIO_VALUE = {
  update: 'update',
  create: 'create',
};

const NameField = () => {
  const { isSubmitting } = useFormikContext();
  const [, { initialValue: idInitialValue }, idHelpers] = useField('id');
  const [nameField, { initialValue: nameInitialValue, error, touched }, nameHelpers] = useField('name');
  const [radio, setRadio] = useState(() => (idInitialValue ? RADIO_VALUE.update : RADIO_VALUE.create));
  const nameHelpersRef = useRef(nameHelpers);
  const idHelpersRef = useRef(idHelpers);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setRadio(value);

      if (value === RADIO_VALUE.create) {
        idHelpersRef.current.setValue('');

        return;
      }

      if (value === RADIO_VALUE.update) {
        nameHelpersRef.current.setValue(nameInitialValue);
        idHelpersRef.current.setValue(idInitialValue);
      }
    },
    [idInitialValue, nameInitialValue]
  );

  const isTextFieldDisabled = radio === RADIO_VALUE.update || isSubmitting;

  return (
    <Box>
      <RadioGroup aria-label="name-action" name="name-action" value={radio} onChange={handleChange}>
        <StyledFormControlLabel
          value={RADIO_VALUE.update}
          control={<Radio color="primary" />}
          label={
            <>
              <span>Save changes to</span>
              &nbsp;
              <Box component="b" color="#232629">
                {capitalize(nameInitialValue)}
              </Box>
            </>
          }
          disabled={isSubmitting || !idInitialValue}
          textTransform="none"
        />

        <StyledFormControlLabel
          value={RADIO_VALUE.create}
          control={<Radio color="primary" />}
          label="Create new view"
          disabled={isSubmitting}
          textTransform="none"
        />
      </RadioGroup>

      {!isTextFieldDisabled && (
        <Box m="8px 0 0 25px">
          <StyledTextField
            variant="outlined"
            color="primary"
            placeholder="Enter new view name"
            disabled={isTextFieldDisabled}
            fullWidth
            error={touched && Boolean(error)}
            helperText={touched && error}
            {...nameField}
          />
        </Box>
      )}
    </Box>
  );
};

export default NameField;
