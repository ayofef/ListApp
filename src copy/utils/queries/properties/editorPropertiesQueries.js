import { gql } from '@apollo/client';

export const GQL_Q_GET_AVAILABLE_PROPERTIES = gql`
  query GetAvailableProperties($context: PropertyContextInput!, $matchingTypes: [DataType]) {
    getAvailableProperties(context: $context, matchingTypes: $matchingTypes) {
      group
      properties {
        key
        label
        type
      }
    }
  }
`;
