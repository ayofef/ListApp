import { isNode } from 'react-flow-renderer';
import compact from 'lodash/compact';
import { flowStepTypes } from '../types';

export const VALUE_CONDITION_PREFIX = 'Wt--HandleNodeValue';
export const R_VALUE_CONDITION_PREFIX = /Wt--HandleNodeValue-\d+-/;
export const R_VALUE_CONDITION_PREFIX_INDEX = /Wt--HandleNodeValue-(\d+)-/;

export const repopulateEdges = (elements) => {
  /* filter nodes */
  const { nodes, set } = elements.reduce(
    (acc, element) => {
      if (!isNode(element)) {
        return acc;
      }
      acc.nodes.push(element);
      acc.set.add(element.id);
      return acc;
    },
    {
      nodes: [],
      set: new Set(), // unique node ID
    }
  );
  return nodes.reduce((acc, node) => {
    const { data } = node;
    const typename = data.__typename;
    if (set.has(data.elseStepId)) {
      acc.push({
        id: `e-else-${data.id}-${data.elseStepId}`,
        source: data.id,
        sourceHandle: 'else',
        target: data.elseStepId,
        type: data.group === 'Conditions' ? 'edgeWithButton' : 'default',
      });
    }

    if (set.has(data.nextStepId)) {
      let type = 'default';
      if (data.group === 'Conditions') {
        type = 'edgeWithButton';
      } else if (typename === 'IfElseStep') {
        type = 'edgeWithIfElseButton';
      }
      acc.push({
        id: `e-${data.id}-${data.nextStepId}`,
        source: data.id,
        target: data.nextStepId,
        type,
      });
    }

    if (set.has(data.trueStepId)) {
      acc.push({
        id: `e-true-${data.id}-${data.trueStepId}`,
        source: data.id,
        sourceHandle: 'true',
        target: data.trueStepId,
        type: 'edgeWithIfElseButton',
      });
    }

    if (set.has(data.falseStepId)) {
      acc.push({
        id: `e-false-${data.id}-${data.falseStepId}`,
        source: data.id,
        sourceHandle: 'false',
        target: data.falseStepId,
        type: 'edgeWithIfElseButton',
      });
    }

    // handle conditions multiple branches
    if (
      (typename === flowStepTypes.DataConditionStep || typename === flowStepTypes.CountConditionStep) &&
      data?.conditions?.length
    ) {
      data.conditions.forEach((condition) => {
        if (set.has(condition.nextStepId)) {
          acc.push({
            id: `e-${data.id}-${condition.nextStepId}`,
            source: data.id,
            target: condition.nextStepId,
            type: data.group === 'Conditions' ? 'edgeWithButton' : 'default',
          });
        }
      });
    }

    if (data.valueToRoute?.length > 0) {
      compact(data.valueToRoute).forEach((route, index) => {
        if (set.has(route.label)) {
          acc.push({
            id: `e-${route.key}-${data.id}-${route.label}`,
            source: data.id,
            sourceHandle: `${VALUE_CONDITION_PREFIX}-${index}-${route.key}`,
            target: route.label,
          });
        }
      });
    }

    return acc;
  }, nodes);
};

export const facadeStepsToElements = (steps = []) => {
  const nodes = steps.map((step) => ({
    id: step.id,
    data: {
      ...step,
    },
    position: step?.layout?.location
      ? {
          x: step.layout.location.left,
          y: step.layout.location.top,
        }
      : null,
  }));

  return repopulateEdges(nodes);
};

export const facadeElementsToSteps = (elements) => {
  return elements.filter(isNode).map((node) => {
    return {
      ...node.data,
      id: node.id,
      layout: {
        location: {
          left: node.position.x,
          top: node.position.y,
        },
      },
      validationErrors: undefined,
    };
  });
};
