export const planConsts = [
  {
    planKey: 'business_individual',
    options: () => [
      'Create your own or access ‘ready to launch’ card programme templates',
      'Up to 10 virtual cards per month',
    ],
  },
  {
    planKey: 'business_team',
    prevPlanKey: 'business_individual',
    options: (prevPlan) => [
      `Everything from ${prevPlan} plan`,
      'Up to 50 * virtual cards per month',
      'Advanced card controls',
      'Team card requests and approval automation',
      'Full Slack workspace integration',
      'Your company branded virtual cards',
    ],
  },
  {
    planKey: 'Enterprise',
    prevPlanKey: 'business_team',
    options: (prevPlan) => [
      `Everything from ${prevPlan} plan`,
      'Unlimited virtual cards per month',
      'Multi-entity support',
      'SSO support',
      'Conierege account support',
      'WhenThen API access',
      '3rd party API driven virtual card creation',
    ],
  },
];
