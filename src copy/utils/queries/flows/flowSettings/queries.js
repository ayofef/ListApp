import { gql } from '@apollo/client';

const LIST_CONNECTIONS = gql`
  query listConnections($types: [ConnectionType], $status: [ConnectionStatus], $ids: [String]) {
    listConnections(types: $types, status: $status, ids: $ids) {
      name
      id
      supportedPaymentMethods
      enabledPaymentMethods
      origin
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
      featured
      flowUsage {
        flows {
          name
          id
        }
      }
      canConnect
      canDisconnect
    }
  }
`;

export { LIST_CONNECTIONS };
