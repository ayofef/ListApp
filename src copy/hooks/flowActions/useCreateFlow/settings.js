import { CREATE_FLOW, CREATE_FLOW_FROM_TEMPLATE, GQL_M_DUPLICATE_FLOW } from '../../../utils/queries/flows/mutations';
import { isDefined } from '../../../utils/helpers';

const createFlowFromTemplate = {
  key: 'createFlowFromTemplate',
  mutation: CREATE_FLOW_FROM_TEMPLATE,
  title: 'Create Automation from template',
  //Note: addToFlowId means Automation id, not PaymentFlow id
  createVariables: (templateId, addToFlowId) => ({ templateId, ...(isDefined(addToFlowId) && { addToFlowId }) }),
  getNewFlow: (data) => data?.createFlowFromTemplate,
};

const createFlow = {
  key: 'createFlow',
  mutation: CREATE_FLOW,
  title: 'Create Automation',
  createVariables: () => undefined,
  getNewFlow: (data) => data?.createFlow,
};

const duplicateFlow = {
  key: 'duplicateFlow',
  mutation: GQL_M_DUPLICATE_FLOW,
  title: 'Duplicate Automation',
  createVariables: (flowId) => ({ flowId }),
  getNewFlow: (data) => data?.duplicateFlow,
};

export { createFlowFromTemplate, createFlow, duplicateFlow };
