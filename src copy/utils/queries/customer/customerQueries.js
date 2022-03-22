import { gql } from '@apollo/client';

const GQL_Q_SMTP_SETTINGS = gql`
  {
    we {
      smtpSettings {
        serverAddress
        username
        encryptionType
        portNumber
      }
    }
  }
`;

const GQL_Q_LIST_RECOMMENDATIONS = gql`
  {
    listRecommendations {
      id
      targetId
      targetType
      title
      message
      logo
      actionPath
      completed
      systemCreated
      systemUpdated
    }
  }
`;

export { GQL_Q_SMTP_SETTINGS, GQL_Q_LIST_RECOMMENDATIONS };
