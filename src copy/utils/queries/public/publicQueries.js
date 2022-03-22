import { gql } from '@apollo/client';

export const GET_LOGINS = gql`
  {
    getAvailableLogins {
      type
      loginUrl
      loginButton
    }
  }
`;

export const GET_PLANS = gql`
  {
    plans {
      id
      name
      uiCode
      monthlyPrice
      annualPrice
      description
      transactionLimit
      isDefault
    }
  }
`;

export const GET_ME_AND_WE = gql`
  query getMeAndWe {
    getOnboardingStatus
    me {
      id
      name
      avatar
      role
      email {
        address
        confirmed
      }
      phone {
        phoneNumber
        type
        confirmed
      }
      mfaType
      acceptedTC
      teams {
        id
        inviter {
          name
        }
        team {
          id
          name
          customer {
            name
          }
          membersCount
        }
        status
        role
      }
    }
    we {
      id
      metadata
      name
      onboardingStatus
      currency {
        id
        symbol
        displayName
      }
      activePlan {
        id
        freeTrial
        remainingTrialDays
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
      billingDetails {
        taxId
        billingAddress {
          line1
          line2
          locality
          region
          country
        }
      }
      smtpSettings {
        id
        serverAddress
        username
        portNumber
        encryptionType
      }
      customDomainSettings {
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
      brand {
        id
        accentColor
        logoUrl
        logoContentType
        faviconUrl
        faviconContentType
        logoObjectKey
        faviconObjectKey
        actionButton
        socialNetworks {
          id
          iconUrl
          linkUrl
        }
        templateConfig {
          signOffContent
          footerText
          logoType
          logoPosition
          logoSize
          logoText
        }
      }
    }
    getGettingStartedDetails {
      onboardingStepsCompleted
    }
  }
`;

export const GET_ADD_TO_SLACK = gql`
  query {
    getAddToSlack {
      url
      button
    }
  }
`;

export const GET_SECURE_CARD_INFO = gql`
  query($id: ID!) {
    getSecureCardInfo(id: $id) {
      id
      number
      expMonth
      expYear
      securityCode
    }
  }
`;

export const GET_CONNECTIONS_INFO = gql`
  query {
    hasIssuingBalance
  }
`;

export const USER_FRAGMENT = gql`
  fragment f_User on User {
    id
    name
    acceptedTC
    avatar
    role
    email {
      address
      confirmed
    }
    phone {
      phoneNumber
      type
      confirmed
    }
  }
`;

export const LIST_REQUESTS = gql`
  query listRequests($filter: RequestFilter!) {
    listRequests(filter: $filter) {
      instanceId
      requester {
        ...f_User
      }
      description
      classifier
      ts
      amount {
        rawAmount
        currency
        formattedAmount
      }
      actions {
        label
        action
        variables
        style
      }
      placeholder
      status
    }
  }
  ${USER_FRAGMENT}
`;

export const AUTOCOMPLETE_MERCHANT = gql`
  query($query: String!) {
    autocompleteMerchant(query: $query) {
      id
      name
      logo
      domain
    }
  }
`;

export const SELECT_OPTIONS = gql`
  query($selectId: String!, $query: String!) {
    selectOptions(query: $query, selectId: $selectId)
  }
`;

export const GQL_Q_TEAM_LIST = gql`
  query teamList {
    me {
      teams {
        id
        status
        inviter {
          name
        }
        team {
          id
          name
          membersCount
        }
      }
    }
  }
`;
