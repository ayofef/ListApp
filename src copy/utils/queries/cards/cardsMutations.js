import { gql } from '@apollo/client';

export const FREEZ_CARD = gql`
  mutation PauseVCN($id: ID!, $pause: Boolean!) {
    pauseVCN(id: $id, pause: $pause)
  }
`;

export const CANCEL_CARD = gql`
  mutation CancelVCN($id: ID!) {
    cancelVCN(id: $id)
  }
`;

export const FREEZ_CARDS = gql`
  mutation PauseVCN($ids: [ID!]!, $pause: Boolean!) {
    pauseVCNs(ids: $ids, pause: $pause)
  }
`;

export const CANCEL_CARDS = gql`
  mutation CancelVCNs($ids: [ID!]!) {
    cancelVCNs(ids: $ids)
  }
`;

export const SEND_ACTION_DATA = gql`
  mutation sf($instanceId: String!, $input: JSON) {
    userInput(instanceId: $instanceId, input: $input) {
      id
      status
    }
  }
`;
