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

const PropertyToEvalField = () => {
  const { t } = useTranslation();
  const [{ propertyToEval }, updateDataToSave] = useElementDataToSave();
  const { getAvailableProperties, loading } = useFlowPropertiesList();
  const availableProperties = flattenEditorPropertiesGroup(getAvailableProperties);
  const validationMessage = useValidationMessage('propertyToEval');

  const onChange = useCallback(
    ({ target: { value } }) => {
      const selectedProperty = availableProperties.find((item) => item.key === value);
      updateDataToSave({ propertyToEval: value !== NONE ? value : null, selectedDataType: selectedProperty?.type });
    },
    [availableProperties, updateDataToSave]
  );

  const options = useMemo(() => {
    return availableProperties.map((property) => ({
      ...property,
      title: property.label,
      value: property.key,
    }));
  }, [availableProperties]);

  return (
    <LoadingState loading={loading}>
      <Title mb="8px !important">{t('Watch for')}</Title>
      {!loading && availableProperties && (
        <StyledFormControl fullWidth error={!!validationMessage}>
          <Select value={propertyToEval || NONE} options={options} onChange={onChange} />
          <FormHelperText>{validationMessage}</FormHelperText>
        </StyledFormControl>
      )}
    </LoadingState>
  );
};

export default PropertyToEvalField;
