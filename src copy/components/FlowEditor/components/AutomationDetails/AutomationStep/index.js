import React from 'react';
import { useFlowEditorContext } from '../../../context';
import ChangeOwnerStep from './ChangeOwnerStep';
import CheckoutFormStep from './CheckoutFormStep';
import ConnectionEventTriggerStep from './ConnectionEventTriggerStep';
import DataActionStep from './DataActionStep';
import DataConditionStep from './DataConditionStep';
import DataConnectionActionStep from './DataConnectionActionStep';
import DataEventTriggerStep from './DataEventTriggerStep';
import DataExportStep from './DataExportStep';
import DataLookupStep from './DataLookupStep';
import DelayActionStep from './DelayActionStep';
import FindLinkedDataStep from './FindLinkedDataStep';
import FixedConnectionActionStep from './FixedConnectionActionStep';
import IfElseStep from './IfElseStep';
import PaymentProcessingTrigger from './PaymentProcessingTrigger';
import ScheduledTriggerStep from './ScheduledTriggerStep';
import { StyledWrapper } from './styled';
import UndefinedStep from './UndefinedStep';
import UserActionStep from './UserActionStep';
import ValueConditionStep from './ValueConditionStep';
import WebhookActionStep from './WebhookActionStep';
import WebhookTriggerStep from './WebhookTriggerStep';
import NodeHelper from './fields/NodeHelper';
import ThreeDsStep from './ThreeDsStep';
import CountConditionStep from './CountConditionStep';

const FLOW_STEPS = {
  // triggers
  ConnectionEventTriggerStep,
  DataEventTriggerStep,
  ScheduledTriggerStep,
  WebhookTriggerStep,
  PaymentProcessingTrigger,
  // actions
  ChangeOwnerStep,
  DataExportStep,
  DataLookupStep,
  DataActionStep,
  FixedConnectionActionStep,
  UserActionStep,
  WebhookActionStep,
  FindLinkedDataStep,
  DelayActionStep,
  CheckoutFormStep,
  ThreeDsStep,
  // conditions
  IfElseStep,
  ValueConditionStep,
  DataConditionStep,
  CountConditionStep,
  // services
  DataConnectionActionStep,
};

const AutomationStep = () => {
  const { selectedElementData } = useFlowEditorContext();
  if (!selectedElementData) {
    return null;
  }
  const SelectedStep = FLOW_STEPS[selectedElementData.__typename] || UndefinedStep;
  return (
    <StyledWrapper>
      <NodeHelper />
      <SelectedStep />
    </StyledWrapper>
  );
};

export default AutomationStep;
