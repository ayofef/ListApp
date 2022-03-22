import { gql } from '@apollo/client/core';

export const GENERATE_API_KEY = gql`
  mutation generateApiKey {
    generateApiKey {
      id
    }
  }
`;

export const DELETE_API_KEY = gql`
  mutation deleteApiKey($id: String!) {
    deleteApiKey(id: $id)
  }
`;
