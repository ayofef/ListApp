import { v4 } from 'uuid';
import { facadeStepsToElements } from './facades';
import { flowStepTypes } from '../types';

export const getNewElements = (newNodeData, position) => {
  if (newNodeData.__typename === flowStepTypes.CompositeFlowStep) {
    const { children } = newNodeData;
    let offsetLeft = -400;
    let offsetTop = -200;
    let elseStepId;
    const newChildren = children.map((child) => {
      if (child.__typename === flowStepTypes.DataConditionStep) {
        elseStepId = v4();
        return {
          ...child,
          elseStepId,
          id: v4(),
        };
      }
      if (child.__typename === flowStepTypes.DataActionStep && elseStepId) {
        return {
          ...child,
          id: elseStepId,
        };
      }
      return { ...child, id: v4() };
    });
    const childrenWithLayout = newChildren.map((child, index) => {
      offsetLeft += 400;
      offsetTop += 200;
      const nextStep = newChildren[index + 1];
      const childWithLayout = {
        ...child,
        layout: {
          location: {
            left: position.x + offsetLeft,
            top: position.y + offsetTop,
          },
        },
        unsaved: true,
      };
      if (child.__typename === flowStepTypes.DataConditionStep) {
        return childWithLayout;
      }
      return {
        ...childWithLayout,
        nextStepId: nextStep?.id,
      };
    });

    return facadeStepsToElements(childrenWithLayout);
  }
  const positionedNewNodeData = {
    ...newNodeData,
    layout: {
      location: {
        left: position.x,
        top: position.y,
      },
    },
    unsaved: true,
    ...((newNodeData.__typename === flowStepTypes.WebhookActionStep ||
      newNodeData.__typename === flowStepTypes.WebhookTriggerStep) && { useBasicAuthentication: true }),
  };

  return facadeStepsToElements([positionedNewNodeData]);
};
