import { gql } from '@apollo/client';

export const SWITCH_TEAM = gql`
  mutation switchTeams($id: ID!) {
    switchTeams(id: $id) {
      token
      refreshToken
    }
  }
`;

export const JOIN_TEAM = gql`
  mutation acceptInvitation($id: ID!) {
    acceptInvitation(id: $id) {
      token
      refreshToken
    }
  }
`;
