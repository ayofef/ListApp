import { gql } from '@apollo/client';

export const GET_CARD_DETAIL = gql`
  query($id: ID!) {
    getVCN(id: $id) {
      id
      programmeName
      balance {
        formattedAmount
      }
      usage
      actions {
        label
        action
        attachField
        variables
        style
      }
      totalSpend {
        formattedAmount
      }
      nextTopupDate
      topup {
        auto
        request
        topupTimespan
        topupAmount {
          formattedAmount
        }
      }
      status
      card {
        id
        nickname
        cardholderName
        maskedNumber
        expMonth
        expYear
        address {
          line1
          line2
          line3
          line4
          locality
          region
          country
          postcode
        }
        cardFundingType
        cardType
      }
      flowInstance {
        id
        flow {
          id
          config {
            initialState {
              key
              source
              value
              display
              label
              type
            }
          }
        }
      }
      events {
        date
        type
        message
      }
    }
  }
`;
