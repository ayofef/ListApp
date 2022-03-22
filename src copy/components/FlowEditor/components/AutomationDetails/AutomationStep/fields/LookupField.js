import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import capitalize from 'lodash/capitalize';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import { StyledFormControl } from './styled';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { GQL_Q_GET_SEARCHABLE_TYPES } from '../../../../../../utils/queries/flows/queries';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const LookupField = () => {
  const { t } = useTranslation();
  const [{ searchForType }, updateDataToSave] = useElementDataToSave();
  const { loading, error, data } = useQuery(GQL_Q_GET_SEARCHABLE_TYPES);

  const options = useMemo(
    () =>
      data?.getSearchableTypes?.map((type) => ({
        title:
          type
            ?.replace('CORE_', '')
            ?.split('_')
            ?.map((s) => capitalize(s))
            ?.join(' ') ?? type,
        value: type,
      })),
    [data]
  );
  const onChange = useCallback(
    ({ target: { value } }) => updateDataToSave({ searchForType: value !== NONE ? value : null, connectionIds: [] }),
    [updateDataToSave]
  );

  const validationMessage = useValidationMessage('searchForType');

  useNotificationManager('error', error?.message, 'Fetch people');

  return (
    <Box>
      <Title>{t('Search for')}</Title>

      {loading && <Box>Loading...</Box>}

      {!loading && options && (
        <StyledFormControl fullWidth error={!!validationMessage}>
          <Select value={searchForType || NONE} options={options} onChange={onChange} />
          <FormHelperText>{validationMessage}</FormHelperText>
        </StyledFormControl>
      )}
    </Box>
  );
};

export default LookupField;
