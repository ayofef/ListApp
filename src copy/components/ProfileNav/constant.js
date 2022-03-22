import { Profile, Support, Security, Logout } from '../../assets/icons/ProfileNav';

const DICTIONARY = {
  profile: 'My Profile',
  support: 'Support',
  security: 'Security',
  logout: 'Log out',
};

const NAV_ITEMS = [
  {
    id: 'navItemProfile',
    title: DICTIONARY.profile,
    icon: Profile,
    type: 'link',
    to: '/settings/profile',
  },
  {
    id: 'navItemSupport',
    title: DICTIONARY.support,
    icon: Support,
    type: 'fn',
  },
  {
    id: 'navItemSecurity',
    title: DICTIONARY.security,
    icon: Security,
    type: 'fn',
  },
  {
    id: 'navItemLogOut',
    title: DICTIONARY.logout,
    icon: Logout,
    type: 'fn',
  },
];

export { NAV_ITEMS, DICTIONARY };
