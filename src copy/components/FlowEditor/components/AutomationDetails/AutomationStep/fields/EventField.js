import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { FormHelperText } from '@material-ui/core';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import { StyledFormControl } from './styled';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const EventField = () => {
  const { t } = useTranslation();
  // do not destructure elementDataToSave
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();

  const options = elementDataToSave?.availableEvents?.map((e) => ({
    title: e.label,
    value: e.eventType,
  }));

  const onChange = useCallback(({ target: { value } }) => updateDataToSave({ event: value !== NONE ? value : null }), [
    updateDataToSave,
  ]);

  const validationMessage = useValidationMessage('event');

  return (
    <Box>
      <Title>{t('Event')}</Title>

      <StyledFormControl fullWidth error={!!validationMessage}>
        <Select value={elementDataToSave?.event || NONE} options={options} onChange={onChange} />
        <FormHelperText>{validationMessage}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};

export default EventField;
