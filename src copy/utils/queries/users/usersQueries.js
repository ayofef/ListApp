import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query($query: String!) {
    searchUsers(query: $query) {
      id
      name
      email
      avatar
      status
      role
      teamRole
    }
  }
`;

export const GET_USERS = gql`
  query($userIds: [String!]) {
    getUsers(userIds: $userIds) {
      id
      name
      email
      avatar
      status
      role
      teamRole
    }
  }
`;
