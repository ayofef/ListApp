import { gql } from '@apollo/client';

export const F_CONFIG_FRAGMENT = gql`
  fragment f_FlowConfiguration on FlowConfiguration {
    steps {
      ...f_FlowStep
      __typename
    }
    __typename
  }
`;

export const F_STEP_FRAGMENT = gql`
  fragment f_FlowStep on FlowStep {
    id
    validationErrors {
      key
      label
    }
    __typename
  }
`;

export const F_HOURLY_DETAILS_FRAGMENT = gql`
  fragment f_HourlyDetails on HourlyPaymentDetails {
    countTotal
    intervals {
      interval {
        start
        end
      }
      count
    }
  }
`;

export const F_FRAGMENT = gql`
  fragment f_Flow on Flow {
    id
    name
    status
    minimumPlanRequired
    instruct
    config {
      ...f_FlowConfiguration
      systemCreated
      systemUpdated
      __typename
    }
    draftConfig {
      ...f_FlowConfiguration
      systemCreated
      systemUpdated
      __typename
    }
    __typename
    connectionIds
    flowInstanceCount
    errorCount
  }
  ${F_CONFIG_FRAGMENT}
  ${F_STEP_FRAGMENT}
`;
