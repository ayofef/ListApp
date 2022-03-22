import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useQuery } from '@apollo/client';
import { useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { StyledFormControl } from './styled';
import { GQL_Q_LIST_DATA_TYPE_DESCRIPTORS } from '../../../../../../utils/queries/flows/queries';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import LoadingState from '../../LoadingState';

const LinkedTypeField = () => {
  const { t } = useTranslation();
  const [{ linkedType }, updateDataToSave] = useElementDataToSave();
  const { loading, error, data } = useQuery(GQL_Q_LIST_DATA_TYPE_DESCRIPTORS);

  const options = useMemo(() => {
    return data?.listDataTypeDescriptors
      ?.filter((descriptor) => descriptor?.isComplex)
      ?.map((descriptor) => ({
        title: descriptor?.label,
        value: descriptor?.type,
      }));
  }, [data?.listDataTypeDescriptors]);

  const onChange = useCallback(
    ({ target: { value } }) => updateDataToSave({ linkedType: value !== NONE ? value : null }),
    [updateDataToSave]
  );

  const validationMessage = useValidationMessage('linkedTo');

  useNotificationManager('error', error?.message, 'Fetch data type descriptors');

  return (
    <LoadingState loading={loading}>
      <Title>{t('Linked type')}</Title>
      {!loading && options && (
        <StyledFormControl fullWidth error={!!validationMessage}>
          <Select value={linkedType || NONE} options={options} onChange={onChange} />
          <FormHelperText>{validationMessage}</FormHelperText>
        </StyledFormControl>
      )}
    </LoadingState>
  );
};

export default LinkedTypeField;
