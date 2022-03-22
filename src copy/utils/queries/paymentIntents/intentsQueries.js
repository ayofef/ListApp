import { gql } from '@apollo/client/core';

export const paymentTimelineFields = gql`
  fragment f_PaymentIntentTimeline on IntentTimeline {
    intentStarted {
      status
      date
    }
    shipping {
      status
      date
    }
    delivery {
      status
      date
    }
    billing {
      status
      date
    }
    paymentAttempts {
      status
      date
    }
    completeIntent {
      status
      date
    }
  }
`;

export const GET_PAYMENT_INTENTS = gql`
  query listIntents($data: CheckoutFilterInput) {
    listIntents(data: $data) {
      id
      trackingId
      date
      status
      amount {
        formattedAmount
      }
      location {
        country
      }
      customer {
        id
        email
        name
        isGuest
      }
      paymentIntent {
        status
        outcome
        paymentMethod
        sca
      }
      shipping {
        status
      }
      delivery {
        status
      }
      paymentIntentTimeline {
        ...f_PaymentIntentTimeline
      }
    }
  }
  ${paymentTimelineFields}
`;

export const GET_PAYMENT_INTENT = gql`
  query getIntentInternal($id: ID!) {
    getIntentInternal(id: $id) {
      id
      trackingId
      date
      status
      paymentFlowId
      amount {
        formattedAmount
      }
      location {
        country
      }
      customer {
        id
        email
        name
        isGuest
      }
      paymentIntent {
        status
        outcome
        paymentMethod
        sca
      }
      shipping {
        status
      }
      delivery {
        status
      }
      paymentIntentTimeline {
        ...f_PaymentIntentTimeline
      }
    }
  }
  ${paymentTimelineFields}
`;
