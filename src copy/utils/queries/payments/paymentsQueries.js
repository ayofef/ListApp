import { gql } from '@apollo/client';
import { paymentFilter } from '../../fragments/publicFragments';
import { paymentTimelineFields } from '../paymentIntents/intentsQueries';

const issueQueryString =
  'getPaymentIssue(paymentIssueId: $issueId) {      id      teamId      userId      customerId      paymentId      userAssigneeName      userCreatorName      assigneeUser {        id        name        email        avatar      }      userCreator {        id        name        email        avatar      }      comments {        id        teamId        paymentId        paymentIssueId        message        systemCreated        systemUpdated        userCreator {          id          name        }      }      attachments      status      type      priority      systemCreated      systemUpdated      customer {        id        email      }    }';

export const GET_PAYMENT_GQL = (issueId) => gql`
  query getPayment($id: ID! ${issueId ? ',$issueId: ID!' : ''}) {
    getPaymentDescribed(id: $id) {
      key
      type
      label
      isEditable
      value
    }
    getLinkedIntent(id: $id) {
      id
      trackingId      
      currency
      amount {
          formattedAmount
      }
      location {
          country
      }
      customer {
          id
          name
          email
          isGuest
      }
      linkedPayments {
          paymentId
          status
          time
      }
      timeline { 
          ...f_PaymentIntentTimeline
      }
      
    }
    listPaymentComments(paymentId: $id) {
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
            email
            avatar
        }
    }
    listPaymentIssues(paymentId: $id) {
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
    ${(issueId && issueQueryString) || ''}
  }
  ${paymentTimelineFields}

`;

export const GET_PAYMENT_LIST = gql`
  query listPayments($first: Int, $after: String, $last: Int, $before: String, $data: PaymentFilterInput) {
    listPayments(first: $first, after: $after, last: $last, before: $before, data: $data) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        totalSize
      }
      edges {
        cursor
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
    }
  }
`;

export const GQL_Q_LIST_PAYMENT_VIEW = gql`
  query listPaymentViews {
    listPaymentViews {
      defaultVisibleFields
      defaultHiddenFields
      views {
        id
        teamId
        customerId
        userId
        isOwner
        name
        sharedWith
        sharedWithUsers {
          id
          name
          email
          avatar
        }
        tableState
        filter {
          ...paymentFilter
        }
        visibleFields
        hiddenFields
        sort {
          fieldName
          order
        }
      }
    }
  }
  ${paymentFilter}
`;

export const GQL_Q_LIST_PAYMENT_EXPORT_COLUMNS = gql`
  query getPaymentColumns {
    getPaymentColumns {
      name
      label
      defaultColumn
    }
  }
`;
