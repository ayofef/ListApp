import { gql } from '@apollo/client';

export const GET_CONNECTIONS = gql`
  query getConnections($types: [ConnectionType], $status: [ConnectionStatus]) {
    listConnections(types: $types, status: $status) {
      name
      id
      company {
        logo
        domain
        name
        homepageUrl
        categories
      }
      system
      status
      type
    }
  }
`;

export const GET_SIMPLE_CONNECTIONS = gql`
  query listConnections($status: [ConnectionStatus]) {
    listConnections(status: $status) {
      name
      id
      status
    }
  }
`;
export const GET_CONNECTION_FEE = gql`
  query GetConnectionFee($id: String!) {
    getConnectionFee(id: $id) {
      percentage
      fixed
      currency
    }
  }
`;

export const GET_CONNECTION_DETAILS = gql`
  query GetConnection($id: ID!) {
    getConnection(id: $id) {
      id
      name
      system
      status
      type
      supportedPaymentMethods
      enabledPaymentMethods
      historicalPayments
      supportedEventDetails {
        label
      }
      company {
        domain
        name
        logo
        shortDescription
        longDescription
        homepageUrl
        supportUrl
        pricingUrl
        categories
      }
      actionDetails {
        actions {
          name
        }
      }
    }
  }
`;

export const GET_IMPORT_STATUS = gql`
  query getImportConnectionPaymentsGateway($id: String!) {
    getImportConnectionPaymentsGateway(id: $id) {
      id
      status
    }
  }
`;

export const GET_LINKED_PAYMENT_FLOW = gql`
  query findPaymentFlows($connectionId: String!) {
    findPaymentFlows(connectionId: $connectionId) {
      id
      name
    }
  }
`;
