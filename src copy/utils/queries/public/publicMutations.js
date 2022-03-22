import { gql } from '@apollo/client';

export const O_AUTH_LOGIN = gql`
  mutation oauthLogin($serviceName: String!, $code: String!, $redirectUrl: String) {
    loginViaOAuth(externalService: $serviceName, oauthCode: $code, redirectUrl: $redirectUrl) {
      isLoggedIn
      user {
        id
      }
      customer {
        id
        currency {
          id
          symbol
          displayName
        }
      }
      token
      refreshToken
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation login($username: String!, $password: String, $googleToken: String) {
    login(username: $username, password: $password, googleToken: $googleToken) {
      isLoggedIn
      customer {
        id
        currency {
          id
          symbol
          displayName
        }
      }
      token
      refreshToken
      recoveryCodes
      status
    }
  }
`;

export const RESEND_EMAIL_CONFIRM = gql`
  mutation ResendEmailConfirm($email: String) {
    resendEmailConfirmation(email: $email)
  }
`;

export const DEFAULT_SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $googleToken: String
    $companyName: String
    $currency: String
    $acceptedTC: Boolean!
    $billingEmail: String
    $metadata: Metadata
  ) {
    signup(
      userEmail: $email
      acceptedTC: $acceptedTC
      userPassword: $password
      googleToken: $googleToken
      companyName: $companyName
      name: $name
      currency: $currency
      billingEmail: $billingEmail
      metadata: $metadata
    ) {
      isLoggedIn
      user {
        id
        teams {
          id
          team {
            id
            name
          }
          status
          role
        }
      }
      customer {
        id
      }
      token
      refreshToken
      recoveryCodes
      barcodeUri
    }
  }
`;

export const GET_INVITE_DETAILS = gql`
  mutation getInviteDetails($inviteEmail: String!, $inviteToken: String!) {
    getInviteDetails(email: $inviteEmail, token: $inviteToken) {
      id
      customer {
        id
        name
      }
      invitee {
        id
        name
        avatar
      }
      inviter {
        id
        name
        avatar
      }
    }
  }
`;

export const ADD_AUTHENTIFICATOR = gql`
  mutation addAuthenticator($phoneNumber: String, $oobChannel: String, $mfaType: String) {
    addAuthenticator(phoneNumber: $phoneNumber, oobChannel: $oobChannel, mfaType: $mfaType) {
      isLoggedIn
      token
      refreshToken
      recoveryCodes
      barcodeUri
      status
    }
  }
`;

export const VERIFY_AUTHENTIFICATOR = gql`
  mutation verifyAuthenticator($bindingCode: String!) {
    verifyAuthenticator(bindingCode: $bindingCode) {
      token
      refreshToken
      barcodeUri
      recoveryCodes
      status
    }
  }
`;

export const DEFAULT_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      isLoggedIn
      user {
        id
      }
      customer {
        id
      }
      token
      refreshToken
      status
    }
  }
`;

export const DEFAULT_LOGOUT = gql`
  mutation Logout($refreshToken: String) {
    logout(refreshToken: $refreshToken) {
      isLoggedIn
    }
  }
`;

export const CREATE_LOGIN_AUTH = gql`
  mutation createLoginChallenge {
    createLoginChallenge {
      token
      refreshToken
      status
    }
  }
`;

export const REQUEST_APP = gql`
  mutation requestApp($category: String, $name: String, $email: String, $feature: String!) {
    requestApp(feature: $feature, name: $name, email: $email, category: $category)
  }
`;
export const CREATE_SPEND_REQUEST = gql`
  mutation createRequest(
    $amount: String!
    $purchase: String!
    $merchant: String!
    $merchant_url: String
    $reason: String
  ) {
    createSpendRequest(
      amount: $amount
      purchase: $purchase
      reason: $reason
      merchant: $merchant
      merchant_url: $merchant_url
    ) {
      id
      requester {
        id
        name
        avatar
      }
      approver {
        id
        name
        avatar
      }
      purchase
      reason
      status
      merchant
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($token: String, $code: String, $email: String) {
    confirmEmail(token: $token, code: $code, email: $email)
  }
`;

export const ADD_SLACK_TOKEN = gql`
  mutation AddSlackToken($token: String!) {
    addSlackToken(token: $token)
  }
`;

export const SAVE_CONFIGURATION = gql`
  mutation SaveConfiguration($appId: String!, $config: JSON!) {
    saveConfiguration(appId: $appId, config: $config) {
      appId
      children {
        labelKey
        key
        labelKey
        iconKey
        descriptionKey
        helpKey
      }
    }
  }
`;

export const APPROVE_SPEND_REQUEST = gql`
  mutation ApproveSpendRequest($id: ID!) {
    approveSpendRequest(id: $id) {
      id
    }
  }
`;

export const DENY_SPEND_REQUEST = gql`
  mutation DenySpendRequest($id: ID!) {
    denySpendRequest(id: $id) {
      id
    }
  }
`;

export const EDIT_SPEND_REQUEST = gql`
  mutation UpdateSpendRequest(
    $id: ID!
    $id: ID!
    $amount: String!
    $purchase: String!
    $merchant: String!
    $merchant_url: String
    $reason: String
  ) {
    updateSpendRequest(
      id: $id
      amount: $amount
      purchase: $purchase
      merchant: $merchant
      merchant_url: $merchant_url
      reason: $reason
    ) {
      id
      requester {
        id
        avatar
      }
      approver {
        id
        avatar
      }
      teamId
      purchase
      reason
      status
      merchant
      merchantUrl
      canApprove
    }
  }
`;

export const DELETE_SPEND_REQUEST = gql`
  mutation DeleteSpendRequest($id: ID!) {
    deleteSpendRequest(id: $id)
  }
`;

export const COMPLETE_INVITATION = gql`
  mutation CompleteInvitation($email: String!, $password: String, $googleToken: String, $token: String!) {
    completeInvitation(email: $email, password: $password, googleToken: $googleToken, token: $token) {
      isLoggedIn
      customer {
        id
      }
      user {
        id
      }
      token
      refreshToken
    }
  }
`;

export const ADD_RECEIPT = gql`
  mutation AddReceipt($id: String!, $imageData: String!, $fileName: String) {
    addReceipt(id: $id, imageData: $imageData, fileName: $fileName) {
      id
    }
  }
`;

export const DELETE_RECEIPT = gql`
  mutation DeleteReceipt($id: ID!) {
    deleteReceipt(id: $id)
  }
`;

export const SET_CUSTOMER_METADATA = gql`
  mutation SetCustomerMetadata($metadata: JSON) {
    setCustomerMetadata(metadata: $metadata) {
      metadata
    }
  }
`;

export const SEND_RECEIPT_REMINDER = gql`
  mutation SendReceiptReminder($id: ID!) {
    sendReceiptReminder(id: $id) {
      id
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      customer {
        currency {
          id
          symbol
          displayName
        }
      }
    }
  }
`;

export const CONFIRM_BETA_ACCESS = gql`
  mutation confirmBetaCode($betaCode: String!) {
    confirmBetaCode(betaCode: $betaCode)
  }
`;

export const GQL_M_SIGN_UP_BETA = gql`
  mutation signUpBeta(
    $name: String!
    $email: String!
    $companyRole: String!
    $companyName: String!
    $companySize: String!
    $paymentProcessors: [String!]!
    $otherPaymentProcessors: String
    $currency: String!
    $paymentNeeds: [String!]!
    $acceptedTC: Boolean!
    $acceptedNewsletter: Boolean!
    $meetsCriteria: Boolean!
    $registrationMethod: String!
  ) {
    signUpBeta(
      name: $name
      email: $email
      companyRole: $companyRole
      companyName: $companyName
      companySize: $companySize
      paymentProcessors: $paymentProcessors
      otherPaymentProcessors: $otherPaymentProcessors
      currency: $currency
      paymentNeeds: $paymentNeeds
      acceptedTC: $acceptedTC
      acceptedNewsletter: $acceptedNewsletter
      meetsCriteria: $meetsCriteria
      registrationMethod: $registrationMethod
    )
  }
`;

export const GQL_M_VERIFY_BETA_CODE = gql`
  mutation checkBetaCode($emailAddress: String!, $betaAccessToken: String!) {
    checkBetaCode(emailAddress: $emailAddress, betaAccessToken: $betaAccessToken)
  }
`;

export const GQL_M_COMPLETE_BETA_SIGN_UP = gql`
  mutation completeBetaSignUp(
    $registrationMethod: String!
    $emailAddress: String!
    $betaAccessToken: String!
    $password: String
    $googleToken: String
  ) {
    completeBetaSignUp(
      registrationMethod: $registrationMethod
      emailAddress: $emailAddress
      betaAccessToken: $betaAccessToken
      password: $password
      googleToken: $googleToken
    )
  }
`;
