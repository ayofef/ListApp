import { gql } from '@apollo/client';

const GET_CONNECTIONS = gql`
  query listConnections($types: [ConnectionType], $status: [ConnectionStatus]) {
    listConnections(types: $types, status: $status) {
      name
      id
      status
      type
    }
  }
`;

const GET_IMPORT_STATUS = gql`
  query getImportConnectionPaymentsGateway($id: String!) {
    getImportConnectionPaymentsGateway(id: $id) {
      id
      connectionId
      status
    }
  }
`;

export { GET_CONNECTIONS, GET_IMPORT_STATUS };
