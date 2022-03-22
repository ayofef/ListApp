import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText } from '@material-ui/core';
import Title from '../../Title';
import { useValidationMessage } from './hooks';
import Checkbox from '../inputs/Checkbox';
import { P14 } from '../../../../../atoms';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import { StyledFormControlLabel } from '../inputs/styled';

const matchTypes = {
  SINGLE_RECORD: 'SINGLE_RECORD',
  MULTIPLE_RECORDS: 'MULTIPLE_RECORDS',
};

const MatchTypeField = () => {
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const [checkedValue, setCheckedValue] = useState(() => elementDataToSave?.matchType);
  const { t } = useTranslation();

  const setChecked = (matchType) => {
    setCheckedValue(matchType);
    updateDataToSave({ matchType });
  };

  const onChange = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setChecked(matchTypes.MULTIPLE_RECORDS);
    } else {
      setChecked(matchTypes.SINGLE_RECORD);
    }
  };

  const validationMessage = useValidationMessage('matchType');

  return (
    <Box component="section">
      <Title>{t('Match type')}</Title>
      <FormControl fullWidth error={!!validationMessage}>
        <StyledFormControlLabel
          key="matchType"
          value="matchType"
          control={<Checkbox name="matchType" color="primary" size="small" />}
          label={
            <Box display="flex" alignItems="center" ml={1}>
              <P14 color="#787F88">{t('Allow multiple matches?')}</P14>
            </Box>
          }
          checked={checkedValue === matchTypes.MULTIPLE_RECORDS}
          onChange={onChange}
        />
        <FormHelperText>{validationMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default MatchTypeField;
