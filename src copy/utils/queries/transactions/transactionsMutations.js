import { gql } from '@apollo/client';

export const EXPORT_TRANSACTIONS = gql`
  mutation($ids: [String!]!) {
    exportTransactions(ids: $ids) {
      id
      status
      url
      expires
    }
  }
`;
