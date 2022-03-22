import { gql } from '@apollo/client';
import { paymentFilter } from '../../fragments/publicFragments';

export const SAVE_ATTACHMENTS = gql`
  mutation saveAttachments($attachments: [AttachmentInput]!) {
    saveAttachments(attachments: $attachments) {
      id
      fileName
      objectKey
      contentType
    }
  }
`;
export const DELETE_ATTACHMENTS = gql`
  mutation deleteAttachment($attachmentId: ID!) {
    deleteAttachment(attachmentId: $attachmentId)
  }
`;

export const EXPORT_PAYMENTS_CSV = gql`
  mutation downloadPaymentsCsvFile(
    $exportMode: ExportMode!
    $columns: [PaymentColumnInput!]!
    $payments: [ID]
    $data: PaymentFilterInput
  ) {
    downloadPaymentsCsvFile(exportMode: $exportMode, columns: $columns, payments: $payments, data: $data)
  }
`;

export const SAVE_PAYMENT_VIEW = gql`
  mutation savePaymentView($view: PaymentViewInput!) {
    savePaymentView(view: $view) {
      id
      teamId
      customerId
      userId
      name
      visibleFields
      hiddenFields
      sharedWith
      tableState
      sort {
        fieldName
        order
      }
      filter {
        ...paymentFilter
      }
    }
  }
  ${paymentFilter}
`;

export const UPDATE_PAYMENT_VIEW = gql`
  mutation updatePaymentView($id: ID!, $view: PaymentViewInput!) {
    updatePaymentView(id: $id, view: $view) {
      id
      teamId
      customerId
      userId
      name
      visibleFields
      hiddenFields
      tableState
      sort {
        fieldName
        order
      }
      filter {
        ...paymentFilter
      }
    }
  }
  ${paymentFilter}
`;

export const DELETE_PAYMENT_VIEW = gql`
  mutation deletePaymentView($id: ID!) {
    deletePaymentView(id: $id)
  }
`;
export const REMOVE_USER_FROM_VIEW = gql`
  mutation deleteInvitedUserFromPaymentView($viewId: ID!, $invitedUserId: ID!) {
    deleteInvitedUserFromPaymentView(viewId: $viewId, invitedUserId: $invitedUserId)
  }
`;

export const GQL_M_PAYMENT_SEARCH = gql`
  mutation searchInPayments(
    $input: String
    $searchFilter: [SearchFilterDetails]
    $first: Int
    $after: Int
    $last: Int
    $before: Int
  ) {
    searchInPayments(
      input: $input
      searchFilter: $searchFilter
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        node {
          id
          status
          type
          date
          currency
          country
          sourceId
          amount {
            formattedAmount
          }
          paymentCore {
            processorStatus
            paymentMethod
            outcome {
              networkStatus
              reason
              riskLevel
              riskScore
              declineCode
            }
          }
          paymentGateway {
            id
            name
            logo
          }
          paymentCustomer {
            id
            email
            phone
            preferredPaymentMethod
          }
          paymentMethodDetails {
            paymentMethod
            product
            type
            issuingBank
            category
          }
          paymentDetails {
            net {
              formattedAmount
            }
            fee {
              formattedAmount
            }
            processingFee {
              formattedAmount
            }
            tax {
              formattedAmount
            }
            exchangeRate
            localCurrency
            localAmount {
              formattedAmount
            }
            statementDescriptor
            description
          }
          paymentReceipt {
            message
            type
            date
            receiptUrl
          }
          paymentConnections {
            latestCharge
            invoice
            payout
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        totalSize
      }
      availableKnownValues
    }
  }
`;

export const REFUND_PAYMENT = gql`
  mutation refundPaymentInternal($id: ID!, $amount: Float, $reason: String) {
    refundPaymentInternal(id: $id, amount: $amount, reason: $reason) {
      id
    }
  }
`;
