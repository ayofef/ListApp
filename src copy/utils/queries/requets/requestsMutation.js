import { gql } from '@apollo/client';

export const CREATE_NEW_REQUEST = gql`
  mutation userInput($instanceId: String!, $input: JSON) {
    userInput(instanceId: $instanceId, input: $input) {
      id
      status
      created
      flow {
        id
        name
      }
    }
  }
`;
