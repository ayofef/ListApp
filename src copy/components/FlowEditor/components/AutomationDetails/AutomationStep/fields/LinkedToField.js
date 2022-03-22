import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useFlowPropertiesList, useValidationMessage } from './hooks';
import Title from '../../Title';
import Select, { NONE } from '../../../../../forms/_common/Select';
import { StyledFormControl } from './styled';
import { flattenEditorPropertiesGroup } from '../../../../../../utils/helpers';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import LoadingState from '../../LoadingState';

const LinkedToField = () => {
  const { t } = useTranslation();
  const [{ linkedTo }, updateDataToSave] = useElementDataToSave();
  const { getAvailableProperties, loading } = useFlowPropertiesList(['ID']);
  const availableProperties = flattenEditorPropertiesGroup(getAvailableProperties);

  const onChange = useCallback(
    ({ target: { value } }) => updateDataToSave({ linkedTo: value !== NONE ? value : null }),
    [updateDataToSave]
  );

  const options = useMemo(() => {
    return availableProperties.map((property) => ({
      ...property,
      title: property.label,
      value: property.key,
    }));
  }, [availableProperties]);

  const validationMessage = useValidationMessage('linkedTo');

  return (
    <LoadingState loading={loading}>
      <Title>{t('Linked to')}</Title>
      {!loading && availableProperties && (
        <StyledFormControl fullWidth error={!!validationMessage}>
          <Select value={linkedTo || NONE} options={options} onChange={onChange} />
          <FormHelperText>{validationMessage}</FormHelperText>
        </StyledFormControl>
      )}
    </LoadingState>
  );
};

export default LinkedToField;
