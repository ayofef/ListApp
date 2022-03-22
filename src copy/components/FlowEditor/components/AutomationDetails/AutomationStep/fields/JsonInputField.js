import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SubTitle from '../../SubTitle';
import Title from '../../Title';
import { useValidationMessage } from './hooks';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { StyledFormControl } from './styled';

const JsonInputField = () => {
  const { t } = useTranslation();
  const validationPayloadMessage = useValidationMessage('payload');
  const [{ payload }, updateDataToSave] = useElementDataToSave();

  const onChange = (type, { target }) => {
    updateDataToSave({ [type]: target.value });
  };

  const JSONFormatText = () => {
    let pretty;
    try {
      const obj = JSON.parse(payload);
      if (!isEmpty(obj)) {
        pretty = JSON.stringify(obj, undefined, 2);
      } else {
        pretty = payload;
      }
    } catch {
      pretty = payload;
    }
    return pretty;
  };

  return (
    <Box>
      <Box>
        <Title mt="40px">{t('Body JSON Structure')}</Title>
        <SubTitle>
          {t(
            'Paste an example of the metadata you will send in the Authorise API to access your metadata as properties (Optional)'
          )}
        </SubTitle>
      </Box>
      <StyledFormControl error={Boolean(validationPayloadMessage)} height="auto" fullWidth>
        <TextField
          type="textarea"
          rows={5}
          rowsMax={15}
          value={JSONFormatText() ?? ''}
          onChange={(e) => onChange('payload', e)}
          multiline
        />
        <FormHelperText>{validationPayloadMessage}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};

export default JsonInputField;
