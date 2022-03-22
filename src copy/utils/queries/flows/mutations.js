import { gql } from '@apollo/client';
import {
  FLOW_FRAGMENT_SMALL,
  PUB_FLOW_CONFIG_FRAGMENT,
  GET_FLOW_LOGS_FRAGMENT,
  PUB_FLOW_STEPS_FRAGMENT,
} from '../../fragments/publicFragments';

export const CREATE_FLOW = gql`
  mutation {
    createFlow {
      ...f_Flow_Small
    }
  }
  ${FLOW_FRAGMENT_SMALL}
`;

export const CREATE_FLOW_FROM_TEMPLATE = gql`
  mutation createFlowFromTemplate($templateId: String!, $addToFlowId: String) {
    createFlowFromTemplate(templateId: $templateId, addToFlowId: $addToFlowId) {
      ...f_Flow_Small
    }
  }
  ${FLOW_FRAGMENT_SMALL}
`;

export const DELETE_FLOW = gql`
  mutation deleteFlow($flowId: String!) {
    deleteFlow(flowId: $flowId) {
      id
    }
  }
`;

export const SAVE_FLOW = gql`
  mutation saveConfiguration($flowId: String!, $steps: JSON!, $initialState: JSON) {
    saveConfiguration(flowId: $flowId, steps: $steps, initialState: $initialState) {
      ...pub_FlowConfiguration
    }
  }
  ${PUB_FLOW_CONFIG_FRAGMENT}
`;

export const GQL_M_DUPLICATE_FLOW = gql`
  mutation duplicateFlow($flowId: String!) {
    duplicateFlow(flowId: $flowId) {
      ...f_Flow_Small
    }
  }
  ${FLOW_FRAGMENT_SMALL}
`;

export const GQL_M_ARCHIVE_FLOW = gql`
  mutation archiveFlow($flowId: String!) {
    archiveFlow(flowId: $flowId) {
      id
      status
    }
  }
`;

export const GQL_M_ENABLE_FLOW = gql`
  mutation enableFlow($flowId: String!) {
    enableFlow(flowId: $flowId) {
      id
      status
    }
  }
`;

export const GQL_M_UNPUBLISH_FLOW = gql`
  mutation unpublishFlow($flowId: String!) {
    unpublishFlow(flowId: $flowId) {
      id
    }
  }
`;

export const GQL_M_DISCARD_FLOW_CHANGES = gql`
  mutation discardFlow($flowId: String!) {
    discardFlow(flowId: $flowId) {
      id
    }
  }
`;

export const GQL_M_DISABLE_FLOW = gql`
  mutation disableFlow($flowId: String!) {
    disableFlow(flowId: $flowId) {
      id
      status
    }
  }
`;

export const GQL_M_RENAME_FLOW = gql`
  mutation RenameFlow($flowId: String!, $newName: String!) {
    renameFlow(flowId: $flowId, newName: $newName) {
      id
      name
    }
  }
`;

export const GQL_M_PUBLISH_CONFIGURATION = gql`
  mutation PublishConfiguration($flowId: String!) {
    publishConfiguration(flowId: $flowId) {
      id
      ...pub_FlowConfiguration
    }
  }
  ${PUB_FLOW_CONFIG_FRAGMENT}
`;

export const GQL_M_CREATE_PAYMENT_FLOW = gql`
  mutation createPaymentFlow($customerInputs: JSON) {
    createPaymentFlow(customerInputs: $customerInputs) {
      id
      name
      description
      type
      status
      config {
        id
      }
      draftConfig {
        id
      }
      owner
      connectionIds
    }
  }
`;

export const PUBLISH_FLOW = gql`
  mutation publishConfiguration($flowId: String!) {
    publishConfiguration(flowId: $flowId) {
      id
      systemCreated
      systemUpdated
    }
  }
`;

export const CREATE_SUBSTAGE_AUTOMATION = gql`
  mutation createSubstageAutomation($parentType: FlowType!, $parentId: ID!, $automationName: String!) {
    createSubstageAutomation(parentType: $parentType, parentId: $parentId, automationName: $automationName) {
      id
      name
      description
      type
      status
      owner
      connectionIds
    }
  }
`;

export const SETUP_ACCOUNT_FROM_DEMO = gql`
  mutation setupAccountFromDemo {
    setupAccountFromDemo
  }
`;

export const GQL_M_TEST_FLOW = gql`
  mutation testFlow($flowId: String!) {
    testFlow(flowId: $flowId) {
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
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${GET_FLOW_LOGS_FRAGMENT}
`;

export const GQL_M_USER_INPUT_REQUEST = gql`
  mutation userInput($instanceId: String!, $input: JSON) {
    userInput(instanceId: $instanceId, input: $input) {
      id
      flow {
        id
        name
      }
      status
      currentStep {
        ...pub_FlowStep
      }
      created
      steps {
        ...pub_FlowStep
      }
      logs {
        ...f_FlowLog
      }
    }
  }
  ${PUB_FLOW_STEPS_FRAGMENT}
  ${GET_FLOW_LOGS_FRAGMENT}
`;
