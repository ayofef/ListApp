import { gql } from '@apollo/client';

export const GET_METRICS_AND_NOTIFICATIONS = gql`
  query {
    listNotifications {
      id
      description
      type
      topic
      title
      actions {
        label
        style
        actionRole
        variables
        navigate
      }
      targetId
      targetType
      created
    }
  }
`;
