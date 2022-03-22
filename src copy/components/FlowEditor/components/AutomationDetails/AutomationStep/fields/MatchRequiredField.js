import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText } from '@material-ui/core';
import Title from '../../Title';
import { useValidationMessage } from './hooks';
import Checkbox from '../inputs/Checkbox';
import { P14 } from '../../../../../atoms';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { StyledFormControlLabel } from '../inputs/styled';

const MatchRequiredField = () => {
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const { t } = useTranslation();

  const onChange = ({ target }) => {
    const { checked } = target;
    updateDataToSave({ matchRequired: checked });
  };

  const validationMessage = useValidationMessage('matchRequired');

  return (
    <Box component="section">
      <Title>{t('Match required')}</Title>
      <FormControl fullWidth error={!!validationMessage}>
        <StyledFormControlLabel
          key="matchRequired"
          value="matchRequired"
          control={<Checkbox name="matchRequired" color="primary" size="small" />}
          label={
            <Box display="flex" alignItems="center" ml={1}>
              <P14 color="#787F88">{t('Require at least one match?')}</P14>
            </Box>
          }
          checked={elementDataToSave?.matchRequired}
          onChange={onChange}
        />
        <FormHelperText>{validationMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default MatchRequiredField;
