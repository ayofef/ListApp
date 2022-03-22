import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText } from '@material-ui/core';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import Add from '@material-ui/icons/Add';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import WebhookHeadersRow from './WebhookHeadersRow';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import SubTitle from '../../SubTitle';
import { StyledAddNewButton } from './styled';

const WebhookHeadersField = () => {
  const { t } = useTranslation();
  const [{ headers }, updateDataToSave] = useElementDataToSave();
  const validationMessage = useValidationMessage('headers');

  const compactHeaders = useMemo(() => compact(headers ?? []), [headers]);

  const updateHeaders = useCallback(
    (updater) => {
      const nextHeaders = typeof updater === 'function' ? updater(headers) : updater;
      if (nextHeaders) {
        updateDataToSave({
          headers: nextHeaders,
        });
      }
    },
    [updateDataToSave, headers]
  );

  const onChangeRow = useCallback(
    (index) => (value) => {
      updateHeaders((prevHeaders) => prevHeaders?.map((header, i) => (i === index ? value : header)));
    },
    [updateHeaders]
  );

  const onClickAdd = useCallback(() => {
    updateHeaders((prevHeaders) => [...(prevHeaders ?? []), { key: '', label: '' }]);
  }, [updateHeaders]);

  const onClickDelete = useCallback(
    (index) => () => {
      updateHeaders((prevHeaders) => prevHeaders?.filter((_, i) => i !== index));
    },
    [updateHeaders]
  );

  return (
    <Box mb="8px">
      <Title>{t('Headers')}</Title>
      <SubTitle>{t('Include flow variables in your webhook request (optional)')}</SubTitle>

      {!isEmpty(compactHeaders) && (
        <Box p="10.7px 0" bgcolor="#fff" boxSizing="border-box" borderRadius="6px">
          {compactHeaders.map((header, index) => (
            <WebhookHeadersRow
              key={header.key}
              onChange={onChangeRow(index)}
              onDelete={onClickDelete(index)}
              headerKey={header.key}
              headerLabel={header.label}
            />
          ))}

          {Boolean(validationMessage) && (
            <FormControl fullWidth error={Boolean(validationMessage)}>
              <FormHelperText>{validationMessage}</FormHelperText>
            </FormControl>
          )}
        </Box>
      )}

      <StyledAddNewButton type="button" startIcon={<Add />} onClick={onClickAdd}>
        {t('Add new')}
      </StyledAddNewButton>
    </Box>
  );
};

export default WebhookHeadersField;
