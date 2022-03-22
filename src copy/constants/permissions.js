import { AUTOMATION_PERMISSIONS } from '../pages/MVPAutomation/permissions';
import { SETTINGS_PERMISSIONS } from '../pages/Settings/permissions';
import { GETTING_STARTED_PERMISSIONS } from '../pages/GettingStarted/permissions';

const APPLICATION_PERMISSIONS = [...SETTINGS_PERMISSIONS, ...AUTOMATION_PERMISSIONS, ...GETTING_STARTED_PERMISSIONS];

export { APPLICATION_PERMISSIONS };
