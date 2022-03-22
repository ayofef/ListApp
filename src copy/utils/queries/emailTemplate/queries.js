import { gql } from '@apollo/client';

const GQL_Q_TEMPLATES = gql`
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

export { GQL_Q_TEMPLATES };
