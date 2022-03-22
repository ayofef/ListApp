import { UI_ROUTES } from '../../constants/routes';
import usePermission from '../../permissions/hooks/usePermission';
import { GETTING_STARTED_PERMISSIONS_IDS } from './permissions';
import { AUTOMATION_PERMISSIONS_IDS } from '../MVPAutomation/permissions';

const useGetGettingStartedPermission = ({ hasCompletedGettingStartedChecklist }) => {
  const [canAccessGettingStarted] = usePermission(GETTING_STARTED_PERMISSIONS_IDS.gettingStarted);
  const [canAccessAutomation] = usePermission(AUTOMATION_PERMISSIONS_IDS.automations);

  const redirectUrl = canAccessAutomation ? UI_ROUTES.automations : UI_ROUTES.payments;
  const hasGettingStartedPermission = canAccessGettingStarted && !hasCompletedGettingStartedChecklist;

  return {
    hasGettingStartedPermission,
    redirectUrl,
  };
};
export { useGetGettingStartedPermission };
