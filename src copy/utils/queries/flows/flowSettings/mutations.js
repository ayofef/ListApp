import { gql } from '@apollo/client';
import { F_FRAGMENT } from '../fragments';

/**PAYMENT_PROCESSOR */
const GQL_ADD_PROCESSOR_TO_FLOW = gql`
  mutation enableGatewayForPaymentFlow($flowId: ID!, $gatewayConnectionId: String!) {
    enableGatewayForPaymentFlow(flowId: $flowId, gatewayConnectionId: $gatewayConnectionId) {
      id
    }
  }
`;

const GQL_SET_PROCESSOR_AS_DEFAULT = gql`
  mutation setDefaultGatewayForPaymentFlow($flowId: ID!, $gatewayConnectionId: String!) {
    setDefaultGatewayForPaymentFlow(flowId: $flowId, gatewayConnectionId: $gatewayConnectionId) {
      id
    }
  }
`;

const GQL_REMOVE_PROCESSOR_FROM_FLOW = gql`
  mutation removeGatewayFromPaymentFlow($flowId: ID!, $gatewayConnectionId: String!) {
    removeGatewayFromPaymentFlow(flowId: $flowId, gatewayConnectionId: $gatewayConnectionId) {
      id
    }
  }
`;

/**CHECKOUT */

const GQL_SET_CHECKOUT_TYPE = gql`
  mutation setCheckoutForPaymentFlow($flowId: ID!, $checkoutType: CheckoutType!) {
    setCheckoutForPaymentFlow(flowId: $flowId, checkoutType: $checkoutType) {
      id
    }
  }
`;

const GQL_ENABLE_PAYMENT_METHOD_FOR_FLOW = gql`
  mutation enablePaymentMethodsForPaymentFlow($flowId: ID!, $connectionId: String!, $methods: [String!]) {
    enablePaymentMethodsForPaymentFlow(flowId: $flowId, connectionId: $connectionId, methods: $methods) {
      ...f_Flow
      __typename
      settings {
        configuredCheckout
        enabledGateways
        defaultGateway
        paymentMethods {
          connectionId
          methods
        }
        __typename
      }
      draftSettings {
        configuredCheckout
        enabledGateways
        defaultGateway
        paymentMethods {
          connectionId
          methods
        }
        __typename
      }
      automations {
        ...f_Flow
        __typename
      }
    }
  }
  ${F_FRAGMENT}
`;

export {
  GQL_ADD_PROCESSOR_TO_FLOW,
  GQL_SET_PROCESSOR_AS_DEFAULT,
  GQL_SET_CHECKOUT_TYPE,
  GQL_REMOVE_PROCESSOR_FROM_FLOW,
  GQL_ENABLE_PAYMENT_METHOD_FOR_FLOW,
};
