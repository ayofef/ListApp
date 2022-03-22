import { gql } from '@apollo/client';

export const SETTINGS_PAGE = gql`
  query settings {
    we {
      id
      name
      currency {
        id
        symbol
        displayName
      }
      metadata
      activePlan {
        id
        freeTrial
        remainingTrialDays
        price {
          period
          amount {
            formattedAmount
          }
        }
        plan {
          id
          name
          annualPrice
          monthlyPrice
          description
          transactionLimit
          isDefault
        }
        remainingTrialDays
      }
      billingDetails {
        billingEmail
        billingCard {
          id
          cardholderName
          maskedNumber
          expMonth
          expYear
        }
        billingAddress {
          line1
          line2
          locality
          region
          country
          postcode
        }
        taxId
      }
    }
    plans {
      id
      name
      annualPrice
      monthlyPrice
      description
      transactionLimit
      isDefault
    }
    billingUpcomingInvoice {
      planName
      charges {
        rawAmount
        currency
        formattedAmount
      }
      invoice {
        id
        date
        status
        amount {
          rawAmount
          currency
          formattedAmount
        }
        url
      }
    }
    billingInvoices {
      id
      date
      status
      number
      amount {
        rawAmount
        currency
        formattedAmount
      }
      url
    }
  }
`;

export const PEOPLE_PAGE = gql`
  query people {
    listUsers {
      avatar
      email
      id
      name
      status
      role
      teamRole
    }
  }
`;
