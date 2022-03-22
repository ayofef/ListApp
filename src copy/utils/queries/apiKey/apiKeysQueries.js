import { gql } from '@apollo/client/core';

export const GET_API_KEY_LIST = gql`
  query listApiKeys {
    listApiKeys {
      id
      publicKey
      privateKey
      lastUsedDate
      createdDate
    }
  }
`;
