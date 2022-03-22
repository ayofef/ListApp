import { matchPath } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/routes';

const devZoneUrl = process.env.REACT_APP_DEV_ZONE_URL;

const SIDEBAR_WIDTH = '250px';

const HEADER_HEIGHT = '65px';

const BORDER_COLOR = 'rgba(193, 195, 198, 0.3)';

const ROUTES = [
  {
    label: 'Overview',
    path: '',
  },
  {
    label: 'automations',
    path: '/automations',
  },
  {
    label: 'Settings',
    path: '/settings',
    isActive: (match, location) => {
      if (match) return true;

      return Boolean(
        matchPath(location.pathname, [UI_ROUTES.flowSettingsPaymentProcessor, UI_ROUTES.flowSettingsCheckout])
      );
    },
  },
];

const NEW_TAB_LINKS = [
  {
    label: 'Insights',
    path: UI_ROUTES.insights,
    external: false,
  },
  {
    label: 'Connections',
    path: UI_ROUTES.connections,
    external: false,
  },
  {
    label: 'Developer Docs',
    path: devZoneUrl,
    external: true,
  },
];

const TAGS = {
  active: { title: 'Active', bgColor: '#1CCE6A', color: '#fff' },
  disabled: { title: 'Inactive', bgColor: '#E6E9EC', color: '#545A61' },
};
const createTags = (flow) => {
  if (flow?.status === 'DISABLED') {
    return TAGS.disabled;
  }
  return TAGS.active;
};

const EXCEPTION_DICTIONARY = {
  'flow.delete.not_allowed': 'Cannot delete an active flow.',
  'flow.configuration.missing': 'Flow configuration is missing',
  'flow.default.gateway.removed':
    'Cannot remove your default payment processor, change your default payment processor and try again.',
  'flow.default.gateway.not.enabled': 'Payment processor is currently not connected to flow.',
  'flow.gateway.inUse': 'Payment processor is currently in use, please deactivate and try again.',
};

export { SIDEBAR_WIDTH, ROUTES, NEW_TAB_LINKS, BORDER_COLOR, createTags, EXCEPTION_DICTIONARY, HEADER_HEIGHT };
