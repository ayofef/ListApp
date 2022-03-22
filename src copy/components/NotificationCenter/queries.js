import { gql } from '@apollo/client';

export const GET_LIST_NOTIFICATIONS_SIMPLE = gql`
  query listNotifications {
    listNotifications {
      id
      status
    }
  }
`;

export const GET_LIST_REQUIRES_ACTIONS_SIMPLE = gql`
  query listRequiresAction {
    listRequiresAction {
      id
    }
  }
`;

export const GET_LIST_NOTIFICATIONS = gql`
  query listNotifications {
    listNotifications {
      id
      title
      description
      status
      action {
        label
        style
        role
        linkTo
        parameters {
          key
          label
        }
      }
      userId
      created
    }
  }
`;

export const GET_LIST_REQUIRES_ACTIONS = gql`
  query listRequiresAction {
    listRequiresAction {
      id
      title
      description
      ts
      actions {
        label
        style
        role
        ... on GraphQLUiAction {
          action
          variables
        }
        ... on RouteUiAction {
          linkTo
          parameters {
            key
            label
          }
        }
      }
    }
  }
`;

export const DISMISS_NOTIFICATION = gql`
  mutation dismiss($id: ID!) {
    dismissNotification(id: $id) {
      id
    }
  }
`;
