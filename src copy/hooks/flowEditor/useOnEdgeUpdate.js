import { useCallback } from 'react';
import { updateEdge } from 'react-flow-renderer';
import { repopulateEdges } from '../../components/FlowEditor/utils/facades';

/**
 * @param {Function} setElementsAndSave
 * */
export const useOnEdgeUpdate = (setElementsAndSave) =>
  useCallback(
    (oldEdge, newConnection) => {
      return setElementsAndSave((els) => {
        const oldSourceNodeIndex = els.findIndex((el) => el.id === oldEdge?.source);
        if (oldSourceNodeIndex < 0) {
          return els;
        }
        const newEls = [...els];
        if (oldEdge?.target !== newConnection?.target) {
          newEls[oldSourceNodeIndex] = {
            ...newEls[oldSourceNodeIndex],
            data: {
              ...newEls[oldSourceNodeIndex].data,
              nextStepId: newConnection?.target,
            },
          };
        }
        if (oldEdge?.source !== newConnection?.source) {
          newEls[oldSourceNodeIndex] = {
            ...newEls[oldSourceNodeIndex],
            data: {
              ...newEls[oldSourceNodeIndex].data,
              nextStepId: null,
            },
          };
          const newSourceNodeIndex = els.findIndex((el) => el.id === newConnection?.source);
          newEls[newSourceNodeIndex] = {
            ...newEls[newSourceNodeIndex],
            data: {
              ...newEls[newSourceNodeIndex].data,
              nextStepId: newConnection?.target,
            },
          };
        }
        updateEdge(oldEdge, newConnection, newEls);
        return repopulateEdges(newEls);
      });
    },
    [setElementsAndSave]
  );
