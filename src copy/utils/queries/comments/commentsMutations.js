import { gql } from '@apollo/client/core';

export const ADD_COMMENT = gql`
  mutation addPaymentComment($paymentId: ID!, $paymentIssueId: ID, $comment: CommentInput!) {
    addPaymentComment(paymentId: $paymentId, paymentIssueId: $paymentIssueId, comment: $comment) {
      id
      teamId
      paymentId
      paymentIssueId
      message
      systemCreated
      systemUpdated
      userCreator {
        id
        name
        avatar
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation updatePaymentComment($paymentId: ID!, $commentId: ID!, $paymentIssueId: ID, $comment: CommentInput!) {
    updatePaymentComment(
      paymentId: $paymentId
      commentId: $commentId
      paymentIssueId: $paymentIssueId
      comment: $comment
    ) {
      id
      teamId
      paymentId
      paymentIssueId
      message
      systemCreated
      systemUpdated
      userCreator {
        id
        name
        avatar
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deletePaymentComment($commentId: ID!) {
    deletePaymentComment(commentId: $commentId)
  }
`;
