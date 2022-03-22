import { gql } from '@apollo/client';

export const INVITE_USER = gql`
  mutation inviteUser($companyRole: SystemRole!, $email: String!, $name: String!, $teamId: ID, $teamRole: TeamRole) {
    inviteUser(companyRole: $companyRole, email: $email, name: $name, teamId: $teamId, teamRole: $teamRole) {
      id
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: ID!, $newRole: SystemRole) {
    updateUserRole(id: $id, newRole: $newRole) {
      id
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($id: ID!) {
    deactivateUser(id: $id) {
      id
    }
  }
`;

export const REACTIVATE_USER = gql`
  mutation reactivateUser($id: ID!) {
    reactivateUser(id: $id) {
      id
    }
  }
`;
