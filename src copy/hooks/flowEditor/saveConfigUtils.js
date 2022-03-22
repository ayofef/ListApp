export const fieldsToUpdateFromApiResponse = [
  'isValid',
  'validationErrors',
  'subLabel',
  'webhookUrl',
  'unsaved',
  'availableActions',
  'propertyDataType',
];

export const fieldsUpdatedAfterSave = (step) => {
  return fieldsToUpdateFromApiResponse.reduce((acc, field) => {
    switch (field) {
      case 'unsaved':
        return {
          ...acc,
          unsaved: false,
        };
      case 'availableActions':
        return {
          ...acc,
          ...(step.availableActions && { availableActions: step.availableActions }),
        };
      default:
        return {
          ...acc,
          [field]: step[field],
        };
    }
  }, {});
};
