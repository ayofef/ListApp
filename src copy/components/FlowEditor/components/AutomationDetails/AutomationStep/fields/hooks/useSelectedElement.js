import { useCallback } from 'react';
import { useFlowEditorContext } from '../../../../../context';
import { repopulateEdges } from '../../../../../utils/facades';

const useSelectedElement = () => {
  const { selectedElementData, selectedElementId, setElementsAndSave } = useFlowEditorContext();
  const setSelectedElement = useCallback(
    /**
     * @param {object|function} updater
     * @param {boolean} [updateEdges]
     * */
    (updater, updateEdges) =>
      setElementsAndSave((prevElements) => {
        const newElements = prevElements.map((element) => {
          if (element.id !== selectedElementId) {
            return element;
          }

          const { data } = element;
          const patch = typeof updater === 'function' ? updater(data) : updater;

          return { ...element, data: { ...data, ...patch } };
        });

        return updateEdges ? repopulateEdges(newElements) : newElements;
      }),
    [selectedElementId, setElementsAndSave]
  );

  return [selectedElementData, setSelectedElement];
};

export { useSelectedElement };
