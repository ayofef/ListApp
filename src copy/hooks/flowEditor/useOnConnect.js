import { useCallback } from 'react';
import {
  R_VALUE_CONDITION_PREFIX,
  repopulateEdges,
  VALUE_CONDITION_PREFIX,
} from '../../components/FlowEditor/utils/facades';
import { flowStepTypes } from '../../components/FlowEditor/types';

/**
 * @param {Function} setElementsAndSave
 * */
export const useOnConnect = (setElementsAndSave) =>
  useCallback(
    ({ source, sourceHandle, target, removeTarget }) =>
      setElementsAndSave((els) => {
        const sourceNode = els.find((el) => el.id === source);
        const sourceNodeIndex = els.findIndex((el) => el.id === source);
        if (sourceNodeIndex < 0) {
          return els;
        }
        const newEls = [...els];
        const typename = sourceNode?.data?.__typename;
        switch (sourceHandle) {
          case null:
          case undefined:
            // handle new conditions connections
            if (typename === flowStepTypes.DataConditionStep || typename === flowStepTypes.CountConditionStep) {
              const conditions = newEls[sourceNodeIndex].data?.conditions;
              const newConditions = conditions ? [...conditions, { nextStepId: target }] : [{ nextStepId: target }];
              newEls[sourceNodeIndex] = {
                ...newEls[sourceNodeIndex],
                data: {
                  ...newEls[sourceNodeIndex].data,
                  conditions: removeTarget ? newConditions?.filter((c) => c?.nextStepId !== target) : newConditions,
                },
              };
              break;
            }
            if (sourceNode?.data?.__typename === 'IfElseStep') {
              const trueStepId = newEls[sourceNodeIndex].data?.trueStepId;
              const falseStepId = newEls[sourceNodeIndex].data?.falseStepId;
              if (trueStepId && falseStepId) {
                break;
              }
              // automatically set opposite condition if another has already been set
              if (trueStepId || falseStepId) {
                newEls[sourceNodeIndex] = {
                  ...newEls[sourceNodeIndex],
                  data: {
                    ...newEls[sourceNodeIndex].data,
                    falseStepId: trueStepId ? target : falseStepId,
                    trueStepId: falseStepId ? target : trueStepId,
                  },
                };
                break;
              }
            }
            newEls[sourceNodeIndex] = {
              ...newEls[sourceNodeIndex],
              data: {
                ...newEls[sourceNodeIndex].data,
                nextStepId: removeTarget ? null : target,
              },
            };
            break;
          case 'true':
            newEls[sourceNodeIndex] = {
              ...newEls[sourceNodeIndex],
              data: {
                ...newEls[sourceNodeIndex].data,
                trueStepId: removeTarget ? null : target,
              },
            };
            break;
          case 'false':
            newEls[sourceNodeIndex] = {
              ...newEls[sourceNodeIndex],
              data: {
                ...newEls[sourceNodeIndex].data,
                falseStepId: removeTarget ? null : target,
              },
            };
            break;
          case 'else':
            newEls[sourceNodeIndex] = {
              ...newEls[sourceNodeIndex],
              data: {
                ...newEls[sourceNodeIndex].data,
                elseStepId: removeTarget ? null : target,
              },
            };
            break;
          default:
            if (sourceHandle.startsWith(VALUE_CONDITION_PREFIX)) {
              const key = sourceHandle.replace(R_VALUE_CONDITION_PREFIX, '');

              newEls[sourceNodeIndex] = {
                ...newEls[sourceNodeIndex],
                data: {
                  ...newEls[sourceNodeIndex].data,
                  valueToRoute: newEls[sourceNodeIndex]?.data?.valueToRoute?.map((valueToRoute) =>
                    valueToRoute.key === key
                      ? {
                          key: key,
                          label: target,
                        }
                      : valueToRoute
                  ),
                },
              };
            }
        }
        return repopulateEdges(newEls);
      }),
    [setElementsAndSave]
  );
