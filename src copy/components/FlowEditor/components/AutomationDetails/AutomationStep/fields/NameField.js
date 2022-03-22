import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import { FlowStepIcon } from '../../../FlowStepIcon';
import { StyledFormControl } from './styled';
import { useFlowEditorContext } from '../../../../context';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const emptyErrorText = 'Node name should not be empty';

const NameField = () => {
  const { t } = useTranslation();
  const [{ name, __typename, group }, updateDataToSave] = useElementDataToSave();
  const [emptyError, setEmptyError] = useState(name ? '' : emptyErrorText);
  const { isValidateOn } = useFlowEditorContext();

  const onChange = useCallback(
    ({ target: { value } }) => {
      setEmptyError(value ? '' : emptyErrorText);
      updateDataToSave({ name: value });
    },
    [updateDataToSave]
  );
  const validationMessage = useValidationMessage('name');
  const validationError = validationMessage || emptyError;

  return (
    <Box>
      <Title>{t('Node Name')}</Title>
      <StyledFormControl fullWidth error={validationError}>
        <TextField
          type="text"
          value={name}
          onChange={onChange}
          placeholder={__typename}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlowStepIcon group={group} />
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText>{isValidateOn && validationError}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};

export default NameField;
