import { gql } from '@apollo/client';

export const GQL_Q_GETTING_STARTED = gql`
  query getGettingStartedDetails {
    getGettingStartedDetails {
      paymentConnections
      checkoutApi
      basicAutomation
      premiumAutomation
      invitedColleagues
      onboardingStepsCompleted
    }
  }
`;
