import { gql } from '@apollo/client';

export const GET_AVAILABLE_TEMPLATES = gql`
  {
    getTemplates {
      name
      subject
      content
      actionText
      actionLink
    }
  }
`;
