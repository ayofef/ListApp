import { gql } from '@apollo/client';

export const PUB_FLOW_STEPS_FRAGMENT = gql`
  fragment pub_FlowStep on FlowStep {
    __typename
    id
    name
    group
    subLabel
    isValid
    entered
    exited
    trigger
    nextStepId
    locked
    empty
    layout {
      location {
        top
        left
      }
    }
    icon {
      key
      url
    }
    contributes {
      key
      type
    }
    validationErrors {
      key
      label
    }
    needsExamplesToTest
    # triggers
    ... on ConnectionEventTriggerStep {
      event
      connectionId
      connectionType
      connection {
        id
        name
        company {
          logo
        }
      }
      eventDetails {
        eventType
        label
        icon {
          key
          url
        }
        contributes {
          key
          type
        }
      }
      availableEvents {
        eventType
        label
        icon {
          key
          url
        }
        contributes {
          key
          type
        }
      }
    }
    ... on DataEventTriggerStep {
      dataType
      event
      connectionIds
      connectionType
      primaryConnectionType
      connections {
        id
        name
        company {
          logo
        }
      }
      eventDetails {
        eventType
        label
        icon {
          key
          url
        }
        contributes {
          key
          type
        }
      }
      availableEvents {
        eventType
        label
        icon {
          key
          url
        }
        contributes {
          key
          type
        }
      }
    }
    ... on ScheduledTriggerStep {
      fixedRate
      cron
    }
    ... on WebhookTriggerStep {
      webhookUrl
      useBasicAuthentication
      username
      password
      payload
    }
    ... on PaymentProcessingTrigger {
      payload
    }
    # actions
    ... on ChangeOwnerStep {
      newOwners
    }
    ... on DataExportStep {
      viewId
    }
    ... on DataLookupStep {
      queryDataProvider
      queryType
    }
    ... on FindLinkedDataStep {
      linkedTo
      linkedType
    }
    ... on DataActionStep {
      actionId
      dataType
      inputMappings {
        inputId
        key
      }
    }
    ... on DataConnectionActionStep {
      actionId
      connectionId
      originConnectionId
      connectionLabel
      inputMappings {
        inputId
        key
      }
    }
    ... on UserActionStep {
      actions
      newOwners
      prompt
    }
    ... on CheckoutFormStep {
      form
      submitText
      cancelText
      title
      notify
    }
    ... on WebhookActionStep {
      method
      url
      payloadType
      payload
      username
      password
      authenticationType
      headers {
        key
        label
      }
    }
    ... on DelayActionStep {
      delayTypes
      webhookUrl
      methods
      selectedType
      selectedMethod
      useBasicAuthentication
      username
      password
    }
    ... on ThreeDsStep {
      performThreeDs
      threeDsOptions {
        label
        value
      }
    }
    # conditions
    ... on DataConditionStep {
      selectedDataType
      conditionProperty
      propertyDataType
      conditions {
        op
        right
        label
        nextStepId
      }
      elseStepId
      propertyToEval
      isPresetDataType
    }
    ... on IfElseStep {
      tests {
        left
        op
        right
      }
      logicalOperator
      trueStepId
      falseStepId
    }
    ... on ValueConditionStep {
      testProperty
      operator
      valueToRoute {
        key
        label
      }
      elseStepId
    }
    ... on CountConditionStep {
      selectedDataType
      conditions {
        op
        right
        label
        nextStepId
      }
      elseStepId
      countScope
    }
  }
`;

export const PUB_FLOW_COMPOSITE_STEPS_FRAGMENT = gql`
  fragment pub_CompositeFlowStep on CompositeFlowStep {
    __typename
    id
    name
    group
    isValid
    entered
    exited
    trigger
    nextStepId
    empty
    layout {
      location {
        top
        left
      }
    }
    icon {
      key
      url
    }
    contributes {
      key
      type
    }
    children {
      ...pub_FlowStep
    }
  }
`;

export const GET_FLOW_STATE_FRAGMENT = gql`
  fragment f_FlowState on FlowState {
    # IMPORTANT: DO NOT COMMENT ANY FIELDS
    key
    source
    value
    display
    label
    type
  }
`;

export const GET_FLOW_TEMPLATE_CONFIG_FRAGMENT = gql`
  fragment f_FlowTemplateConfiguration on FlowTemplateConfiguration {
    initialState {
      ...f_FlowState
    }
  }
  ${GET_FLOW_STATE_FRAGMENT}
`;

export const PUB_FLOW_CONFIG_FRAGMENT = gql`
  fragment pub_FlowConfiguration on FlowConfiguration {
    systemCreated
    systemUpdated
    firstStep {
      id
    }
    steps {
      ...pub_FlowStep
    }
    initialState {
      ...f_FlowState
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${GET_FLOW_STATE_FRAGMENT}
`;

const filterDataInput = gql`
  fragment filterDataInput on FilterData {
    value
    selectedVerb
  }
`;

export const paymentFilter = gql`
  fragment paymentFilter on PaymentFilterData {
    dateRange {
      ...filterDataInput
    }
    date {
      ...filterDataInput
    }
    amount {
      ...filterDataInput
    }
    currency {
      ...filterDataInput
    }
    status {
      ...filterDataInput
    }
    method {
      ...filterDataInput
    }
    gateway {
      ...filterDataInput
    }
    type {
      ...filterDataInput
    }
    country {
      ...filterDataInput
    }
  }

  ${filterDataInput}
`;

export const FLOW_FRAGMENT = gql`
  fragment f_FLow on Flow {
    id
    __typename
    name
    status
    paymentFlowId
    minimumPlanRequired
    errorCount
    flowInstanceCount
    config {
      ...pub_FlowConfiguration
    }
    draftConfig {
      ...pub_FlowConfiguration
    }
  }
  ${PUB_FLOW_CONFIG_FRAGMENT}
`;

export const FLOW_FRAGMENT_SMALL = gql`
  fragment f_Flow_Small on Flow {
    __typename
    id
    name
    status
    instruct
  }
`;

export const GET_FLOW_LOGS_FRAGMENT = gql`
  fragment f_FlowLog on FlowLog {
    id
    stepId
    ts
    level
    message
  }
`;

export const GET_FLOW_STEP_LOGS_FRAGMENT = gql`
  fragment f_FlowStepLog on FlowStepLog {
    id
    stepId
    ts
    input {
      ...f_FlowState
    }
    output {
      ...f_FlowState
    }
  }
  ${GET_FLOW_STATE_FRAGMENT}
`;

export const KEYED_LABEL_FRAGMENT = gql`
  fragment f_KeyedLabel on KeyedLabel {
    key
    label
  }
`;
