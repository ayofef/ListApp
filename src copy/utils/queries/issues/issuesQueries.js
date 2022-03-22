import { gql } from '@apollo/client/core';

export const GET_PAYMENT_ISSUES = gql`
  query listPaymentIssues($paymentId: ID, $data: PaymentIssueFilterInput) {
    listPaymentIssues(paymentId: $paymentId, data: $data) {
      id
      systemCreated
      type
      status
      priority
      paymentId
      assigneeUser {
        id
        name
        email
        avatar
      }
      userCreator {
        id
        name
        email
        avatar
      }
      customer {
        email
      }
    }
  }
`;
export const GET_ISSUE_DETAILS = gql`
  query getPaymentIssue($paymentIssueId: ID!) {
    getPaymentIssue(paymentIssueId: $paymentIssueId) {
      id
      teamId
      userId
      customerId
      paymentId
      userAssigneeName
      userCreatorName
      assigneeUser {
        id
        name
        email
        avatar
      }
      userCreator {
        id
        name
        email
        avatar
      }
      comments {
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
        }
      }
      attachments
      status
      type
      priority
      systemCreated
      systemUpdated
      customer {
        id
        email
      }
    }
  }
`;
