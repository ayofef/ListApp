import { facadeElementsToSteps } from '../../../../../../utils/facades';

const createVariables = ({ stepId, elements, values }) => {
  const newItem = {
    key: `${stepId}.user-or-group-list`,
    source: 'SYSTEM',
    type: 'USER_OR_GROUP_LIST',
    label: 'User or group list',
    value: values,
  };

  const newElements = elements.map((step) => {
    if (stepId === step.id) {
      const input = {
        inputId: 'user-or-group-list',
        key: `{{@${stepId}.user-or-group-list}}`,
      };
      const inputMappings = step.data?.inputMappings ?? [];
      return {
        ...step,
        data: {
          ...step.data,
          inputMappings: inputMappings.some((item) => item.key === input.key)
            ? inputMappings
            : [...inputMappings, input],
        },
      };
    }
    return step;
  });

  return {
    steps: facadeElementsToSteps(newElements),
    initialState: [newItem],
  };
};

export { createVariables };
