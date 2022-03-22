import Search from '../../../assets/icons/PremiumDialog/Search';
import ToggleOff from '../../../assets/icons/ToggleOff';

const PLAN_DICTIONARY = {
  starter: 'business_individual',
  advanced: 'business_team',
};
const AUTOMATION_PLAN_DICTIONARY = {
  GENERAL: 'GENERAL',
  PREMIUM: 'PREMIUM',
};

const AUTOMATION_PLAN_LABEL_MAP = {
  [AUTOMATION_PLAN_DICTIONARY.GENERAL]: 'General',
  [AUTOMATION_PLAN_DICTIONARY.PREMIUM]: 'Advanced',
};

const FEATURES = [
  { text: 'Commodo arcu adipiscing', availableIn: PLAN_DICTIONARY.starter },
  { text: 'Massa egestas leo', availableIn: PLAN_DICTIONARY.starter },
  { text: 'Diam massa magna', availableIn: PLAN_DICTIONARY.advanced },
  { text: 'Lorem quam dui', availableIn: PLAN_DICTIONARY.advanced },
];

const PLANS = [
  {
    title: 'Basic Automations',
    description: "Use WhenThen to monitor and create general automations to improve your flows' performance.",
    plan: PLAN_DICTIONARY.starter,
    icon: Search,
  },
  {
    title: 'Powerful Automations',
    description: 'Use WhenThen to collect, authorise and capture payments under your terms.',
    plan: PLAN_DICTIONARY.advanced,
    sdkRequired: true,
    icon: ToggleOff,
  },
];

const TAG_LABEL_MAP = {
  [PLAN_DICTIONARY.starter]: 'Starter Plan',
  [PLAN_DICTIONARY.advanced]: 'Advanced Plan',
};

const FEATURE_MAP = {
  [PLAN_DICTIONARY.starter]: [PLAN_DICTIONARY.starter],
  [PLAN_DICTIONARY.advanced]: [PLAN_DICTIONARY.starter, PLAN_DICTIONARY.advanced],
};

export {
  PLANS,
  PLAN_DICTIONARY,
  FEATURES,
  TAG_LABEL_MAP,
  FEATURE_MAP,
  AUTOMATION_PLAN_LABEL_MAP,
  AUTOMATION_PLAN_DICTIONARY,
};
