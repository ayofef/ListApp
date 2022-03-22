import { gql } from '@apollo/client';

const GQL_M_SMTP_SETTINGS_SAVE = gql`
  mutation saveOrUpdateSmtpSettings(
    $serverAddress: String
    $username: String
    $password: String
    $encryptionType: EncryptionType
    $portNumber: Int
  ) {
    saveOrUpdateSmtpSettings(
      serverAddress: $serverAddress
      username: $username
      password: $password
      encryptionType: $encryptionType
      portNumber: $portNumber
    ) {
      id
      serverAddress
      username
      encryptionType
      portNumber
    }
  }
`;

const GQL_M_SMTP_SETTINGS_TEST = gql`
  mutation testSmtpCredentials(
    $serverAddress: String
    $username: String
    $password: String
    $encryptionType: EncryptionType
    $portNumber: Int
  ) {
    testSmtpCredentials(
      serverAddress: $serverAddress
      username: $username
      password: $password
      encryptionType: $encryptionType
      portNumber: $portNumber
    )
  }
`;

export { GQL_M_SMTP_SETTINGS_SAVE, GQL_M_SMTP_SETTINGS_TEST };
