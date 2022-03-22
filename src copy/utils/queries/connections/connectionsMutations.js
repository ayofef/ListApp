import gql from 'graphql-tag';

export const DISCONNECT_CONNECTION = gql`
  mutation disconnectConnection($id: String!) {
    disconnectConnection(id: $id) {
      status
    }
  }
`;

export const CHANGE_CONNECTION_NAME = gql`
  mutation updateConnection($id: String!, $name: String!) {
    updateConnection(id: $id, name: $name) {
      name
    }
  }
`;

export const CONNECT_CONNECTION = gql`
  mutation startConnection($id: String!) {
    startConnection(id: $id) {
      id
      flowType
      state
      status
      authorizationUrl
      form
    }
  }
`;

export const RECONNECT_CONNECTION = gql`
  mutation reconnectConnection($id: String!) {
    reconnectConnection(id: $id) {
      id
      flowType
      status
      state
      authorizationUrl
      form
    }
  }
`;

export const SAVE_CREDENTIALS = gql`
  mutation exchangeConnectionToken($id: String!, $queryString: String!) {
    exchangeConnectionToken(id: $id, queryString: $queryString) {
      id
      state
      status
      steps {
        form
        type
      }
    }
  }
`;
export const SAVE_CONNECTION_FORM = gql`
  mutation saveConnectionForm($id: String!, $formInput: Object!) {
    saveConnectionForm(id: $id, formInput: $formInput) {
      id
      flowType
      state
      status
      authorizationUrl
      form
      steps {
        form
        type
      }
    }
  }
`;

export const SET_CONNECTION_FEE = gql`
  mutation setConnectionFee($id: String!, $fee: FeeInput) {
    setConnectionFee(id: $id, fee: $fee)
  }
`;

export const GQL_M_ENABLE_PAYMENT_METHODS = gql`
  mutation enablePaymentMethods($id: String!, $methods: [String!]) {
    enablePaymentMethods(id: $id, methods: $methods) {
      id
      name
      status
    }
  }
`;

export const GQL_M_IMPORT_HISTORIC_PAYMENT = gql`
  mutation($id: String!, $flowId: String!) {
    importConnectionPaymentsGateway(id: $id, flowId: $flowId) {
      id
    }
  }
`;
