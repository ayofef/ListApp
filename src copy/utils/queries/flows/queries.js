import { gql } from '@apollo/client';
import {
  FLOW_FRAGMENT,
  FLOW_FRAGMENT_SMALL,
  PUB_FLOW_COMPOSITE_STEPS_FRAGMENT,
  GET_FLOW_STATE_FRAGMENT,
  PUB_FLOW_STEPS_FRAGMENT,
  KEYED_LABEL_FRAGMENT,
  GET_FLOW_LOGS_FRAGMENT,
  GET_FLOW_STEP_LOGS_FRAGMENT,
} from '../../fragments/publicFragments';

export const GET_SDK_INSTALLED_INFO = gql`
  {
    we {
      id
      metadata
    }
  }
`;

export const GET_AVAILABLE_FLOW_LISTS = gql`
  {
    getAvailableFlowTemplates {
      name
      description
    }
    getFlows {
      ...f_FLow
    }
  }
  ${FLOW_FRAGMENT}
`;

export const GET_FLOWS = gql`
  query GetFlows {
    getFlows {
      ...f_Flow_Small
    }
  }
  ${FLOW_FRAGMENT_SMALL}
`;

export const GQL_Q_GET_ARCHIVED_AUTOMATION = gql`
  query GetArchiveAutomation {
    getFlows(status: [DISABLED, ARCHIVED]) {
      ...f_Flow_Small
    }
  }
  ${FLOW_FRAGMENT_SMALL}
`;

export const GET_FLOW = gql`
  query GetFlow($id: ID!) {
    getFlow(id: $id) {
      ...f_FLow
      instruct
    }
  }
  ${FLOW_FRAGMENT}
`;

export const GET_FLOW_STEP_LIBRARY = gql`
  query getFlowStepLibrary($flowId: ID) {
    getFlowStepLibrary(flowId: $flowId) {
      ungrouped {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      triggers {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      extraTriggers {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      conditions {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      extraConditions {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      actions {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      extraActions {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      data {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      engage {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
      services {
        ...pub_FlowStep
        ...pub_CompositeFlowStep
      }
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${PUB_FLOW_COMPOSITE_STEPS_FRAGMENT}
`;

export const GQL_Q_FLOW_INSTANCE = gql`
  query getFlowInstances($inStatus: [FlowInstanceStatus!]) {
    getFlowInstances(inStatus: $inStatus) {
      id
      status
      flow {
        id
        name
      }
      currentStep {
        id
        name
      }
      created
    }
  }
`;

export const GET_FLOW_INSTANCES_WITH_PAGINATION = gql`
  query getFlowInstancesWithPagination(
    $flowId: String!
    $inStatus: [FlowInstanceStatus!]
    $startDate: DateTime
    $endDate: DateTime
    $cursor: PaginationInput
  ) {
    getFlowInstancesWithPagination(
      flowId: $flowId
      inStatus: $inStatus
      startDate: $startDate
      endDate: $endDate
      cursor: $cursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        totalSize
      }
      instances {
        id
        flow {
          id
          name
        }
        status
        created
        steps {
          ...pub_FlowStep
        }
        currentStep {
          ...pub_FlowStep
        }
        logs {
          ...f_FlowLog
        }
        stepLogs {
          ...f_FlowStepLog
        }
      }
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${GET_FLOW_LOGS_FRAGMENT}
  ${GET_FLOW_STEP_LOGS_FRAGMENT}
`;

export const GQL_Q_GET_ACTION_FOR = gql`
  query getActionsFor($id: String, $dataType: DataType) {
    getActionsFor(id: $id, dataType: $dataType) {
      actions {
        id
        name
        forDataType
        inputs {
          id
          name
          type
          required
          placeholder
          tooltip
        }
        returns {
          key
          type
        }
      }
    }
  }
`;

export const GQL_Q_LIST_CONNECTIONS = gql`
  query listConnections(
    $ids: [String]
    $types: [ConnectionType]
    $system: Boolean
    $events: [EventType]
    $status: [ConnectionStatus]
    $dataTypes: [DataType]
  ) {
    listConnections(
      ids: $ids
      types: $types
      system: $system
      events: $events
      status: $status
      dataTypes: $dataTypes
    ) {
      id
      name
      system
      status
      canConnect
      canDisconnect
      type
      supportedEvents
      company {
        logo
        domain
        name
        homepageUrl
        supportUrl
        pricingUrl
        categories
      }
    }
  }
`;

export const GQL_Q_GET_SEARCHABLE_TYPES = gql`
  query GetSearchableTypes {
    getSearchableTypes
  }
`;

export const GQL_Q_GET_SUPPORTED_CONNECTION_TYPES = gql`
  query getSupportedConnectionTypes($dataTypes: [DataType!]) {
    getSupportedConnectionTypes(DataTypes: $dataTypes)
  }
`;

export const GQL_Q_GET_FLOW_INSTANCE = gql`
  query getFlowInstance($id: ID!) {
    getFlowInstance(id: $id) {
      id
      flow {
        id
        name
      }
      status
      requester {
        id
        name
      }
      created
      stepLogs {
        stepId
        input {
          ...f_FlowState
        }
        output {
          ...f_FlowState
        }
      }
      state {
        ...f_FlowState
      }
      steps {
        ...pub_FlowStep
      }
      logs {
        id
        ts
        level
        message
      }
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${GET_FLOW_STATE_FRAGMENT}
`;

export const GQL_Q_LOOKUP_ACTION_INPUT_SELECTION = gql`
  query lookupActionInputSelection($actionId: String!, $inputId: String!, $connectionId: String) {
    lookupActionInputSelection(actionId: $actionId, inputId: $inputId, connectionId: $connectionId) {
      key
      label
    }
  }
`;

export const GQL_Q_LIST_DATA_TYPE_DESCRIPTORS = gql`
  query listDataTypeDescriptors {
    listDataTypeDescriptors {
      type
      label
      isComplex
      isEnum
      operators
    }
  }
`;

export const GQL_Q_GET_TEST_EXAMPLES = gql`
  query getTestExamples($instanceId: String!, $stepId: String) {
    getTestExamples(instanceId: $instanceId, stepId: $stepId) {
      description
      asInput
      described {
        key
        type
        label
        isEditable
        value
        __typename
      }
    }
  }
`;

export const GET_POSSIBLE_CONDITION_PROPERTIES_FOR_STEP = gql`
  query getPossibleConditionPropertiesForStep($flowId: String!, $stepId: String!, $propertyToEval: String) {
    getPossibleConditionPropertiesForStep(flowId: $flowId, stepId: $stepId, propertyToEval: $propertyToEval) {
      ...f_KeyedLabel
    }
  }
  ${KEYED_LABEL_FRAGMENT}
`;

export const GET_POSSIBLE_CONDITION_VALUES_FOR_STEP = gql`
  query getPossibleConditionValuesForStep($flowId: String!, $stepId: String!) {
    getPossibleConditionValuesForStep(flowId: $flowId, stepId: $stepId) {
      ...f_KeyedLabel
    }
  }
  ${KEYED_LABEL_FRAGMENT}
`;

export const GET_VALID_OPERATORS_FOR = gql`
  query getValidOperatorsFor($type: DataType!, $property: String) {
    getValidOperatorsFor(type: $type, property: $property)
  }
`;

export const GET_POSSIBLE_ENUM_VALUES_FOR_DATA_TYPE = gql`
  query getPossibleEnumValuesForDataType($type: DataType!) {
    getPossibleEnumValuesForDataType(type: $type) {
      ...f_KeyedLabel
    }
  }
  ${KEYED_LABEL_FRAGMENT}
`;

export const GET_NODE_HELPER = gql`
  query getNodeHelper($nodeId: String!) {
    getNodeHelper(nodeId: $nodeId) {
      nodeHelperId
      title
      content
      docsUrls {
        url
        label
      }
    }
  }
`;
