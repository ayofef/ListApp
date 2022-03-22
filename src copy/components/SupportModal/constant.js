import { Knowledgebase, FAQ, Twitter, Slack, Contact } from '../../assets/icons/CommunityModal';

const FN_MAP = {
  contact: 'Contact support',
};

const MODAL_CONTENT = [
  {
    icon: Knowledgebase,
    title: 'Knowledge base',
    description: 'Self-serve training and resolutions',
    link: 'https://intercom.help/whenthen/en',
  },
  {
    icon: FAQ,
    title: 'FAQ',
    description: 'Quick self-serve answers to your questions',
    link: 'https://intercom.help/whenthen/en/collections/2981688-faq',
  },
  // {
  //   icon: ReleaseNotes,
  //   title: 'Release notes',
  //   description: "Check what we've fixed and are working on",
  //   link: '',
  //   badge: true,
  // },
  {
    icon: Twitter,
    title: 'Follow updates on Twitter',
    description: 'Follow key updates on Twitter',
    link: 'https://twitter.com/whenthenhq',
  },
  {
    icon: Slack,
    title: 'Join the Slack community',
    description: 'Be a part of the payments conversation',
    link: 'https://swegr7b6gsn.typeform.com/to/t9khGJnC',
  },
  {
    icon: Contact,
    title: FN_MAP.contact,
    description: 'Speak directly with a PayGeek',
    type: 'fn',
  },
];

export { MODAL_CONTENT, FN_MAP };
