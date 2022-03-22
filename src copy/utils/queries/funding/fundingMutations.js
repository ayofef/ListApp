import { gql } from '@apollo/client';

export const ADD_CARD_FUNDING_SOURCE = gql`
  mutation AddCardFundingSource(
    $nickname: String!
    $accountNumber: CreditCardNumber!
    $expMonth: String!
    $expYear: String!
    $nameOnCard: String!
    $securityCode: String!
  ) {
    addCardFundingSource(
      nickname: $nickname
      accountNumber: $accountNumber
      expMonth: $expMonth
      expYear: $expYear
      nameOnCard: $nameOnCard
      securityCode: $securityCode
    ) {
      id
    }
  }
`;

export const UPDATE_CARD_FUNDING_SOURCE = gql`
  mutation UpdateCardFundingSource(
    $id: ID!
    $accountNumber: CreditCardNumber
    $expMonth: String
    $expYear: String
    $nameOnCard: String
    $securityCode: String
    $nickname: String
    $plaidToken: String
    $unlinkInstitution: Boolean
  ) {
    updateCardFundingSource(
      id: $id
      accountNumber: $accountNumber
      expMonth: $expMonth
      expYear: $expYear
      nameOnCard: $nameOnCard
      securityCode: $securityCode
      nickname: $nickname
      plaidToken: $plaidToken
      unlinkInstitution: $unlinkInstitution
    ) {
      id
      linkedInstitution {
        name
        logo
      }
    }
  }
`;

export const SET_AS_DEFAULT_FUNDING_SOURCE = gql`
  mutation SetAsDefaultFundingSource($id: ID!) {
    setAsDefaultFundingSource(id: $id) {
      id
    }
  }
`;

export const DELETE_FUNDING_SOURCE = gql`
  mutation DeleteFundingSource($id: ID!) {
    deleteFundingSource(id: $id)
  }
`;
