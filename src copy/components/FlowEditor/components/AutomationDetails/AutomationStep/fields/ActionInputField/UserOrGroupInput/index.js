import React, { useCallback, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { useActionInputContext } from '../actionInputContext';
import { usePeopleField } from '../../hooks/usePeopleField';
import { useFlowEditorContext } from '../../../../../../context';
import { useSelectedElement } from '../../hooks';
import { createVariables } from './createVariables';
import { useSaveConfiguration } from '../../../../../../../../hooks/flowEditor/useSaveConfiguration';
import MultiSelectSection from '../../../sections/MultiSelectSection';
import { selectTypes } from '../../../inputs/types';

const UserOrGroupInput = () => {
  const { t } = useTranslation();
  const { validationMessage, fieldId } = useActionInputContext();
  const { options } = usePeopleField(fieldId);
  const {
    flowId,
    elements,
    initialState,
    setInitialState,
    elementDataToSave,
    setElementDataToSave,
    setElements,
    setChangesMade,
    selectedElementData,
  } = useFlowEditorContext();
  const [{ id: stepId }] = useSelectedElement();
  const { saveFlowPromise } = useSaveConfiguration({
    flowId,
    initialState,
    setElements,
    setInitialState,
    setChangesMade,
    selectedElementData,
    elementDataToSave,
    setElementDataToSave,
  });

  const [inputData, setInputData] = useState(() => {
    return initialState?.find(({ key }) => key === `${stepId}.user-or-group-list`)?.value;
  });

  const saveFlow = useCallback(
    (values) => {
      const variables = createVariables({ stepId, values, elements });
      return saveFlowPromise({ variables }).then(({ errors }) => {
        if (errors) {
          NotificationManager.error(t('errors.errorSavingData'), 'Oops..', 5000);
        }
      });
    },
    [stepId, elements, saveFlowPromise, t]
  );

  const selectHandler = async (values) => {
    setInputData(values);
    await saveFlow(values);
  };

  return (
    <MultiSelectSection
      options={options}
      selectedOptionIds={inputData}
      validationMessage={validationMessage}
      handleChange={selectHandler}
      selectType={selectTypes.people}
      isSearchBar
    />
  );
};

export default UserOrGroupInput;
