import { gql } from '@apollo/client';

export const GQL_M_SIGNUP_REASON = gql`
  mutation updateUserSignupReasonOptions($options: [String!]) {
    updateUserSignupReasonOptions(options: $options) {
      isLoggedIn
      status
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation($email: String) {
    forgotPassword(email: $email)
  }
`;

export const UPDATE_MY_PROFILE = gql`
  mutation($avatarFileData: String, $email: String, $name: String, $removeAvatar: Boolean) {
    updateMyProfile(avatarFileData: $avatarFileData, email: $email, name: $name, removeAvatar: $removeAvatar) {
      id
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation(
    $companyName: String
    $currency: String
    $taxId: String
    $billingEmail: String
    $line1: String
    $line2: String
    $line3: String
    $line4: String
    $locality: String
    $region: String
    $postcode: String
    $country: String
    $accountNumber: CreditCardNumber
    $expMonth: String
    $expYear: String
    $nameOnCard: String
    $securityCode: String
  ) {
    updateCustomer(
      companyName: $companyName
      currency: $currency
      taxId: $taxId
      billingEmail: $billingEmail
      line1: $line1
      line2: $line2
      line3: $line3
      line4: $line4
      locality: $locality
      region: $region
      postcode: $postcode
      country: $country
      accountNumber: $accountNumber
      expMonth: $expMonth
      expYear: $expYear
      nameOnCard: $nameOnCard
      securityCode: $securityCode
    ) {
      id
      billingDetails {
        billingCard {
          id
          cardholderName
          nickname
          maskedNumber
          expMonth
          expYear
        }
      }
      currency {
        id
      }
    }
  }
`;

export const COMPLETE_CUSTOMER_SIGNUP = gql`
  mutation completeCustomerSignup($companyName: String!, $currency: String!, $companySize: CompanySize!) {
    completeCustomerSignup(companyName: $companyName, currency: $currency, companySize: $companySize) {
      token
      refreshToken
    }
  }
`;

export const SETUP_PLAN = gql`
  mutation setupPlan($planId: String!, $period: PlanPeriod!) {
    setupPlan(planId: $planId, period: $period) {
      requirePayment
      token
      activePlan {
        id
        freeTrial
        plan {
          id
          name
          uiCode
          monthlyPrice
          annualPrice
          description
          transactionLimit
          isDefault
        }
        remainingTrialDays
      }
    }
  }
`;

export const GQL_M_SMTP_SETTINGS_SAVE = gql`
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

export const GQL_M_SMTP_SETTINGS_TEST = gql`
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

export const GQL_M_MARK_RECOMMENDATION_AS_COMPLETED = gql`
  mutation markRecommendationAsCompleted($id: ID!) {
    markRecommendationAsCompleted(id: $id)
  }
`;

export const GQL_M_SAVE_DOMAIN_SETTINGS = gql`
  mutation saveOrUpdateCustomDomainSettings($displayName: String!, $emailAddress: String!) {
    saveOrUpdateCustomDomainSettings(displayName: $displayName, emailAddress: $emailAddress) {
      id
      domain
      displayName
      emailAddress
      resourceRecords {
        type
        name
        value
      }
      lastAuthenticationStatus
    }
  }
`;

export const GQL_M_VERIFY_DOMAIN_SETTINGS = gql`
  mutation verifyCustomDomainAuthentication($id: String!) {
    verifyCustomDomainAuthentication(id: $id)
  }
`;

export const GQL_M_DISABLE_DOMAIN_SETTINGS = gql`
  mutation disableCustomDomainAuthentication($id: String!) {
    disableCustomDomainAuthentication(id: $id)
  }
`;
