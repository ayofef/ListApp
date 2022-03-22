import { facadeElementsToSteps } from '../../../../../../../utils/facades';

const createVariables = ({ stepId, elements, values }) => {
  let updatedStep;
  const newItem = {
    key: `${stepId}.message`,
    source: 'SYSTEM',
    type: 'EMAIL_MESSAGE',
    label: 'Message',
    value: {
      to: values.to,
      subject: values.subject,
      body: values.body,
      ...(values.actionLink && {
        actionLink: values.actionLink,
      }),
      ...(values.actionText && {
        actionText: values.actionText,
      }),
      ...(values.cc && {
        cc: values?.cc,
      }),
      ...(values.bcc && {
        bcc: values?.bcc,
      }),
      ...(values.attachments && {
        attachments: values?.attachments,
      }),
    },
  };

  const newElements = elements.map((step) => {
    if (stepId === step.id) {
      const input = {
        inputId: 'message',
        key: `{{@${stepId}.message}}`,
      };

      const inputMappings = step.data?.inputMappings ?? [];

      updatedStep = {
        ...step,
        data: {
          ...step.data,
          inputMappings: inputMappings.some((item) => item.key === input.key)
            ? inputMappings
            : [...inputMappings, input],
        },
      };
      return updatedStep;
    }

    return step;
  });

  return {
    steps: facadeElementsToSteps(newElements),
    initialState: [newItem],
    updatedStep,
  };
};

export { createVariables };
