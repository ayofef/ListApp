import { gql } from '@apollo/client';

export const TOP_UP_ISSUING_BALANCE = gql`
  mutation TopUpIssuingBalance($amount: Float!, $description: String, $statementDescriptor: String) {
    topUpIssuingBalance(amount: $amount, description: $description, statementDescriptor: $statementDescriptor)
  }
`;
