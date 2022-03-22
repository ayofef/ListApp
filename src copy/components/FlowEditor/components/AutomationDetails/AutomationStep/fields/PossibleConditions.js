import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useValidationMessage } from './hooks';
import { usePossibleConditionProperties } from '../../../Conditions/hooks/usePossibleConditionProperties';
import RadioButtonsSection from '../sections/RadioButtonsSection';
import LoadingState from '../../LoadingState';
import { useFlowEditorContext } from '../../../../context';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const PossibleConditions = () => {
  const { t } = useTranslation();
  const { setPreCommitFunction } = useFlowEditorContext();
  const [{ propertyToEval, selectedDataType }] = useElementDataToSave();
  const {
    possibleProperties,
    selectedPossibleProperty,
    setSelectedPossibleProperty,
    updateDataToSave,
    loading,
  } = usePossibleConditionProperties();
  useEffect(() => {
    setPreCommitFunction((element) => {
      if (selectedPossibleProperty !== element.conditionProperty) {
        return {
          ...element,
          propertyToEval,
          selectedDataType,
          conditionProperty: selectedPossibleProperty,
          conditions: element?.conditions?.map((item) => ({ ...item, op: null, right: null })),
        };
      }
      return { ...element, propertyToEval, selectedDataType };
    });
  }, [propertyToEval, selectedDataType, selectedPossibleProperty, setPreCommitFunction]);
  const options = useMemo(() => {
    if (!possibleProperties?.length) {
      return [];
    }
    return possibleProperties?.map((property) => ({
      ...property,
      value: property?.key,
      title: property?.label,
    }));
  }, [possibleProperties]);

  const handleChange = (e) => {
    setSelectedPossibleProperty(e.target.value);
    updateDataToSave({ conditionProperty: e.target.value });
  };

  const validationMessage = useValidationMessage('possibleConditions');

  return (
    <Box>
      {options.length > 1 && (
        <LoadingState loading={loading}>
          <RadioButtonsSection
            name="matchType"
            title={t('Check for')}
            subTitle={t('Choose which condition to look for')}
            options={options}
            validationMessage={validationMessage}
            value={selectedPossibleProperty}
            handleChange={handleChange}
          />
        </LoadingState>
      )}
    </Box>
  );
};

export default PossibleConditions;
