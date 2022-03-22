import { gql } from '@apollo/client';
import { F_FRAGMENT, F_HOURLY_DETAILS_FRAGMENT } from './fragments';

const GET_FLOW_LIST = gql`
  query listPaymentFlows {
    listPaymentFlows {
      id
      name
      instructFlowId
    }
  }
`;

const GET_PAYMENT_FLOW_FOR_GATEWAYS = gql`
  query getPaymentFlowForGateways($id: ID!, $types: [ConnectionType], $status: [ConnectionStatus]) {
    getPaymentFlow(id: $id) {
      enabledGateways
      defaultGateway
    }

    listConnections(types: $types, status: $status) {
      name
      id
      status
      type
      company {
        logo
      }
    }
  }
`;

const GET_PAYMENT_FLOW = gql`
  query getPaymentFlow($id: ID!) {
    getPaymentFlow(id: $id) {
      __typename
      id
      name
      enabledGateways
      defaultGateway
      configuredCheckout
      instructFlowId
      paymentMethods {
        methods
        connectionId
      }
      automations {
        ...f_Flow
        __typename
      }
    }
  }
  ${F_FRAGMENT}
`;

const GET_PAYMENT_FLOW_STAGES = gql`
  query getPaymentFlow($id: ID!) {
    getPaymentFlow(id: $id) {
      id
    }
  }
`;

const GET_FLOW_STATS = gql`
  query getPaymentFlowStats($flowId: ID!) {
    getPaymentFlowStats(flowId: $flowId) {
      issuesPayments {
        ...f_HourlyDetails
      }
      refundedPayments {
        ...f_HourlyDetails
      }
      successfulPayments {
        ...f_HourlyDetails
      }
      failedPayments {
        ...f_HourlyDetails
      }
      declinedPayments {
        ...f_HourlyDetails
      }
      paymentIntents {
        ...f_HourlyDetails
      }
    }
  }
  ${F_HOURLY_DETAILS_FRAGMENT}
`;

const GET_PAYMENT_FLOW_NAME = gql`
  query getPaymentFlow($id: ID!) {
    getFlow(id: $id) {
      id
      name
      __typename
    }
  }
`;

export {
  GET_FLOW_LIST,
  GET_FLOW_STATS,
  GET_PAYMENT_FLOW,
  GET_PAYMENT_FLOW_NAME,
  GET_PAYMENT_FLOW_STAGES,
  GET_PAYMENT_FLOW_FOR_GATEWAYS,
};
