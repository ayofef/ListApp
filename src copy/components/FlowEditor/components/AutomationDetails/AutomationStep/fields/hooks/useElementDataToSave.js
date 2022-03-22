import { useCallback } from 'react';
import { useFlowEditorContext } from '../../../../../context';

const useElementDataToSave = () => {
  const { elementDataToSave, setElementDataToSave } = useFlowEditorContext();

  const updateDataToSave = useCallback(
    (newData) =>
      setElementDataToSave((prevData) => ({
        ...prevData,
        ...newData,
      })),
    [setElementDataToSave]
  );
  return [elementDataToSave, updateDataToSave];
};

export { useElementDataToSave };
