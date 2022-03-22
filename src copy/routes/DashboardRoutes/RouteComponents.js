import DataTables from '../../pages/DataTables';
import SettingsPage from '../../pages/Settings';
import Flows from '../../pages/Flows';
import InsightsPage from '../../pages/InsightsPage';
import GettingStarted from '../../pages/GettingStarted';
import PaymentRoutesSwitch from '../../pages/Payments/PaymentRoutesSwitch';
import MVPAutomation from '../../pages/MVPAutomation';
import { FEATURE_TOGGLES_KEYS } from '../../constants/featureToggles';

const routeComponents = {
  GettingStarted: {
    path: '/getting-started',
    component: GettingStarted,
  },
  Automations: {
    path: '/automations',
    component: MVPAutomation,
    featureToggles: {
      id: [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW],
      expectedValue: false,
    },
  },
  Insights: {
    path: '/insights',
    component: InsightsPage,
    featureToggles: {
      id: [FEATURE_TOGGLES_KEYS.INSIGHTS],
      expectedValue: true,
    },
  },
  DataTables: {
    path: '/data-tables',
    component: DataTables,
  },
  Payments: {
    path: '/payments',
    component: PaymentRoutesSwitch,
  },
  Flows: {
    path: '/flows',
    component: Flows,
    featureToggles: {
      id: [FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW],
      expectedValue: true,
    },
  },
  Settings: {
    path: '/settings',
    component: SettingsPage,
  },
};

export default routeComponents;
