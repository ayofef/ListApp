import find from 'lodash/find';

export const NODE_TOOLTIP_MAP = [
  {
    name: 'Rules',
    __typename: 'IfElseStep',
    tooltip: 'Match one or many rules and conditions and define true and false logic to create complex flows',
  },
  {
    name: 'Card Condition',
    __typename: 'DataConditionStep',
    tooltip: 'Define the next steps of the automation based on certain payment card conditions',
  },
  {
    name: 'Payment Condition',
    __typename: 'DataConditionStep',
    tooltip: 'Define the next steps of the automation based on certain payment conditions',
  },
  {
    name: 'User Action Condition',
    __typename: 'DataConditionStep',
    tooltip: 'Define the next steps of the automation based on user action or approval',
  },
  {
    name: 'Data Export',
    __typename: 'DataExportStep',
    tooltip: 'Export template reports previously saved in from Insights',
  },
  {
    name: 'Request Approval',
    __typename: 'CompositeFlowStep',
    tooltip: 'Request internal user approval to proceed to the next step of the automation',
  },
  {
    name: 'Webhook',
    __typename: 'WebhookActionStep',
    tooltip: 'Generate a webhook request to a destination of your choice',
  },
  {
    name: 'Delay',
    __typename: 'DelayActionStep',
    tooltip: 'Temporarily stop the automation until an external event occurs',
  },
  {
    name: 'Payment Action',
    __typename: 'DataActionStep',
    tooltip: 'Perform a payment action to a payment process you’ve configured',
  },
  {
    name: 'Payment action',
    __typename: 'DataActionStep',
    tooltip: 'Initiate a payment action or authorization',
  },
  {
    name: 'Data Lookup',
    __typename: 'DataActionStep',
    tooltip: 'TBD',
  },
  {
    name: 'Scheduled Trigger',
    __typename: 'ScheduledTriggerStep',
    tooltip: 'Initiate your flow based on a defined date and time',
  },
  {
    name: 'Payment Trigger',
    __typename: 'DataEventTriggerStep',
    tooltip: 'Initiate your flow based on an inbound payment request',
  },
  {
    name: 'Webhook Trigger',
    __typename: 'WebhookTriggerStep',
    tooltip: 'Initiate your automation when you send us WhenThen a webhook',
  },
  {
    name: 'Payment Processing',
    __typename: 'PaymentProcessingTrigger',
    tooltip: 'Payment Processing Trigger',
  },
  {
    name: 'Payment Method Condition',
    __typename: 'DataConditionStep',
    tooltip: 'Define paths of your automation based on payment methods chosen by user at checkout',
  },
  {
    name: 'Custom Condition',
    __typename: 'DataConditionStep',
    tooltip: 'Define a condition based on objects available in your flow',
  },
  {
    name: '3D Secure',
    __typename: 'ThreeDsStep',
    tooltip: 'Define if an authorization should include a 3DS flag',
  },
  {
    name: 'Checkout form',
    __typename: 'CheckoutFormStep',
    tooltip:
      'Instruct your automation to show the checkout experience to your user. Customize the checkout as required',
  },
];

export const getNodeTooltip = (name, __typename) => find(NODE_TOOLTIP_MAP, { name, __typename })?.tooltip || '';
