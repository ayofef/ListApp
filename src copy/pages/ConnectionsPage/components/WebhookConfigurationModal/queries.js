import { gql } from '@apollo/client';

export const GET_CONFIG_FORM = gql`
  query getConfigForm($id: String!) {
    getConfigForm(id: $id) {
      form
    }
  }
`;
