import { Welcome, Settings, Automations, Connections, Insights } from '../../../assets/icons/FlowStages';

const TUTORIAL_CONTENT = [
  {
    className: 'Welcome',
    heading: 'Welcome to <br/> Payment Flows',
    description:
      'Your new payment flow contains all the connections, instructions and logic (automations) to bring your ideal payment experience to your customers and gives you ultimate control over your checkout, how you collect and settle payments and everything in between.',
    Image: Welcome,
  },
  {
    className: 'Settings',
    Image: Settings,
    heading: 'Configure your flow <br/> in Settings',
    description:
      'A flow allows you to monitor your payment performace for a specific use case and create payment logic to imporve your payment flow operations.',
  },
  {
    className: 'Automation',
    Image: Automations,
    heading: 'Payment Logic <br/> (Automations)',
    description:
      'After configuring your payment flow, you can add payment logic (automations) to make your payment operations more intelligent, effective and efficient. Set up smart logic like payment retry, smart routing, and be sure to check our recommended automations to see other ways to improve your payment operations',
  },
  {
    className: 'Connections',
    heading: 'Connections',
    Image: Connections,
    description:
      'Add 3rd party connections to extend the reach of your payment operations. Trigger alerts and notifications from any part of the payment process and automate downstream workflows (like fulfillment, reporting or finance) from payment triggers',
  },
  {
    className: 'Insights',
    Image: Insights,
    heading: 'Payments Insights',
    description:
      'Monitor the payment flow performance and get key insights about your payment operations, like acceptance rates, payment issues, declined and payment processor performance.',
  },
];

export { TUTORIAL_CONTENT };
