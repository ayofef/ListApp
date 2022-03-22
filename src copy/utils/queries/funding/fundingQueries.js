import { gql } from '@apollo/client';

export const LIST_FUNDING_SOURCE = gql`
  query {
    listFundingSources {
      id
      type
      isDefault
      ... on CardFundingSource {
        cardInfo {
          id
          nickname
          maskedNumber
          expMonth
          expYear
          cardholderName
          cardFundingType
          cardType
        }
        linkedInstitution {
          name
          logo
        }
        usedBy
      }
    }
  }
`;

export const GET_LINKED_DATA = gql`
  query ld($linkedTo: String!) {
    listLinkedData(linkedTo: $linkedTo) {
      type
      linkedData {
        id
        type
        linkedFrom
        rawData
        describedData {
          key
          label
          value
          type
        }
      }
    }
  }
`;
