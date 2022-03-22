import { gql } from '@apollo/client';

export const INVITE = gql`
  mutation inviteUsersToPaymentView($viewId: ID!, $userIds: [ID!]!) {
    inviteUsersToPaymentView(viewId: $viewId, userIds: $userIds)
  }
`;
