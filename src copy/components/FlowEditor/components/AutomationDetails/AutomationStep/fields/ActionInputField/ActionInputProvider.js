import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ActionInputContext } from './actionInputContext';
import { useElementDataToSave } from '../hooks/useElementDataToSave';

const findCallback = (id) => ({ inputId }) => inputId === id;

const ActionInputProvider = ({ fieldId, fieldName, fieldType, placeholder, children, validationMessage }) => {
  const [{ actionId, inputMappings }, updateDataToSave] = useElementDataToSave();
  const fieldValue = useMemo(() => inputMappings?.find(findCallback(fieldId))?.key ?? '', [fieldId, inputMappings]);

  const setInputField = useCallback(
    (value) => {
      const newInput = { inputId: fieldId, key: value };
      const prevInputMappings = inputMappings ?? [];
      const nextInputMappings = prevInputMappings.some(findCallback(fieldId))
        ? prevInputMappings.map((input) => (input.inputId === fieldId ? newInput : input))
        : [...prevInputMappings, newInput];
      updateDataToSave({ inputMappings: nextInputMappings });
    },
    [fieldId, updateDataToSave, inputMappings]
  );

  return (
    <ActionInputContext.Provider
      value={{ fieldId, fieldName, fieldType, placeholder, fieldValue, setInputField, validationMessage, actionId }}
    >
      {children}
    </ActionInputContext.Provider>
  );
};

ActionInputProvider.propTypes = {
  fieldId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validationMessage: PropTypes.string,
};

ActionInputProvider.defaultProps = {
  validationMessage: '',
  placeholder: null,
};

export default ActionInputProvider;
