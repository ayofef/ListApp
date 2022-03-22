import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@material-ui/core/FormHelperText';
import Title from '../../Title';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { PromptTextField, StyledFormControl } from './styled';
import { useValidationMessage } from './hooks';

const UserDecisionPromptField = () => {
  const { t } = useTranslation();
  const [{ prompt }, updateDataToSave] = useElementDataToSave();
  const [value, setValue] = useState('');
  const validationMessage = useValidationMessage('prompt');

  useEffect(() => {
    setValue(prompt);
  }, [prompt]);

  const handleOnChange = ({ target: { value: newValue } }) => {
    setValue(newValue);
  };

  const handleOnBlur = () => {
    updateDataToSave({ prompt: value });
  };

  return (
    <Box>
      <Title>{t('Prompt')}</Title>
      <StyledFormControl error={Boolean(validationMessage)} height="148px" fullWidth>
        <PromptTextField value={value} onChange={handleOnChange} onBlur={handleOnBlur} multiline />
        <FormHelperText>{validationMessage}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};

export default UserDecisionPromptField;
