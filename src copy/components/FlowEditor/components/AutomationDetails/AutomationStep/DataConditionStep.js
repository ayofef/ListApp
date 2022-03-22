import React from 'react';
import PossibleConditions from './fields/PossibleConditions';
import LoadingState from '../LoadingState';
import PropertyToEvalField from './fields/PropertyToEvalField';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';

const DataConditionStep = () => {
  const [{ unsaved, isPresetDataType, propertyToEval }] = useElementDataToSave();

  return (
    <LoadingState loading={unsaved}>
      {!isPresetDataType && <PropertyToEvalField />}
      {isPresetDataType || propertyToEval ? <PossibleConditions /> : null}
    </LoadingState>
  );
};

export default DataConditionStep;
