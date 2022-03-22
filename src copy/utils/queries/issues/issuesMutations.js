import { gql } from '@apollo/client/core';

export const CREATE_ISSUES = gql`
  mutation addPaymentIssues($paymentIds: [ID]!, $paymentIssue: PaymentIssueInput) {
    addPaymentIssues(paymentIds: $paymentIds, paymentIssue: $paymentIssue) {
      id
    }
  }
`;

export const UPDATE_ISSUE = gql`
  mutation updatePaymentIssue($paymentId: ID!, $paymentIssue: PaymentIssueInput, $paymentIssueId: ID!) {
    updatePaymentIssue(paymentId: $paymentId, paymentIssue: $paymentIssue, paymentIssueId: $paymentIssueId) {
      id
    }
  }
`;
