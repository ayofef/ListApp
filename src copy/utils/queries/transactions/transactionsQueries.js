import { gql } from '@apollo/client';

export const GET_TRANSACTIONS_EXPORT = gql`
  query($id: ID!) {
    getTransactionExport(id: $id) {
      id
      status
      url
      expires
    }
  }
`;

export const FIND_TRANSACTIONS_BY_SOURCE = gql`
  query($sourceId: String!) {
    findTransactionsBySource(sourceId: $sourceId) {
      fxRate
      merchant
      merchantAvatar
      amount {
        formattedAmount
      }
      merchantCategory {
        id
        label
      }
      merchantAmount {
        currency
        formattedAmount
      }
      purchase {
        amount {
          formattedAmount
        }
        purchase
        merchant
        merchantUrl
        merchantLogoUrl
      }
      invoice
      cardInfo {
        nickname
        cardholderName
        maskedNumber
        expMonth
        expYear
        cardFundingType
        cardType
      }
    }
  }
`;
