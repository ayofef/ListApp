import dashboard from './Dashboard';
import connections from './Connections';
import automations from './Automation';
import settings from './Settings';
import insights from './Insights';
import GettingStarted from './GettingStarted';
import payments from './Payments';
import Flows from './Flows';
import DataTables from './DataTables';
import Tour from './Tour';

export default {
  dashboard,
  connections,
  'data tables': DataTables,
  payments,
  automations,
  settings,
  flows: Flows,
  insights,
  tour: Tour,
  'getting started': GettingStarted,
};
