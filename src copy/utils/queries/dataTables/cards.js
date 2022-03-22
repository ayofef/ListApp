import { gql } from '@apollo/client';

const CREATE_CARD = gql`
  mutation tokeniseCardInternal($data: TokenInput!) {
    tokeniseCardInternal(data: $data) {
      id
    }
  }
`;

const GET_CARDS = gql`
  query listCards($first: Int, $last: Int, $after: String, $before: String) {
    listCards(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        totalSize
      }
      edges {
        node {
          token
          number
          expMonth
          expYear
          name
          type
          product
          bankName
          metadata
          externalId
          fingerprint
          isDefault
          systemCreated
          systemUpdated
          country
          brand
          id
        }
      }
    }
  }
`;

const GET_CARD = gql`
  query getCard($token: String!) {
    getCard(token: $token) {
      token
      number
      expMonth
      expYear
      name
      type
      product
      bankName
      metadata
      externalId
      fingerprint
      isDefault
      vaultCustomerId
      linkedPaymentGateways
      country
      brand
      id
      billingAddress {
        line1
        line2
        city
        postalCode
        state
        country
      }
    }
  }
`;

const DELETE_CARD = gql`
  mutation deletePaymentMethodInternal($token: String!) {
    deletePaymentMethodInternal(token: $token)
  }
`;

export { GET_CARDS, GET_CARD, DELETE_CARD, CREATE_CARD };
