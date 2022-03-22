import { bool, shape, string } from 'prop-types';

const flowStep = {
  __typename: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  group: string.isRequired,
  isValid: bool.isRequired,
  nextStepId: string,
  subLabel: string,
  trigger: bool.isRequired,
  locked: bool.isRequired,
  entered: string,
  exited: string,
};

export const flowStepPropType = shape(flowStep);

export const flowStepTypes = {
  CompositeFlowStep: 'CompositeFlowStep',
  WebhookActionStep: 'WebhookActionStep',
  OptimisePaymentMethods: 'OptimisePaymentMethods',
  WaitForEventStep: 'WaitForEventStep',
  DelayActionStep: 'DelayActionStep',
  WebhookTriggerStep: 'WebhookTriggerStep',
  ConnectionEventTriggerStep: 'ConnectionEventTriggerStep',
  ValueConditionStep: 'ValueConditionStep',
  FindLinkedDataStep: 'FindLinkedDataStep',
  LinkFlowStep: 'LinkFlowStep',
  DataLookupStep: 'DataLookupStep',
  DataExportStep: 'DataExportStep',
  IfElseStep: 'IfElseStep',
  DataEventTriggerStep: 'DataEventTriggerStep',
  CheckoutFormStep: 'CheckoutFormStep',
  WaitOnOutputsStep: 'WaitOnOutputsStep',
  WaitForScheduledTimeStep: 'WaitForScheduledTimeStep',
  DataConnectionActionStep: 'DataConnectionActionStep',
  SetVariableStep: 'SetVariableStep',
  DataActionStep: 'DataActionStep',
  DataConditionStep: 'DataConditionStep',
  RunFlowStep: 'RunFlowStep',
  ScheduledTriggerStep: 'ScheduledTriggerStep',
  UserActionStep: 'UserActionStep',
  ChangeOwnerStep: 'ChangeOwnerStep',
  CountConditionStep: 'CountConditionStep',
};

export const requiredTestUserDecisionStepTypes = [
  flowStepTypes.DataActionStep,
  flowStepTypes.DataConnectionActionStep,
  flowStepTypes.WebhookActionStep,
];
