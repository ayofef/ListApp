import Bolt from '../assets/icons/Bolt';
import TemplatesBell from '../assets/icons/TemplatesBell';
import TemplatesRetry from '../assets/icons/TemplatesRetry';
import TemplatesRedundancy from '../assets/icons/TemplatesRedundancy';
import TemplatesCapture from '../assets/icons/TemplatesCapture';
import TemplatesChat from '../assets/icons/TemplatesChat';
import TemplatesHeadphones from '../assets/icons/TemplatesHeadphones';
import TemplatesGrid from '../assets/icons/TemplatesGrid';
import TemplatesReporting from '../assets/icons/TemplatesReporting';
import TemplatesReconciliation from '../assets/icons/TemplatesReconciliation';
import TemplatesFraud from '../assets/icons/TemplatesFraud';
import TemplatesAutomation from '../assets/icons/TemplatesAutomation';
import THEME from './theme';

const CATEGORY_ICON_MAP = {
  ALERTS: { Icon: TemplatesBell, color: THEME.secondaryColors.aqua },
  RETRY: { Icon: TemplatesRetry, color: THEME.secondaryColors.templatesPurple },
  REDUNDANCY: { Icon: TemplatesRedundancy, color: THEME.secondaryColors.brightOrange },
  CAPTURE: { Icon: TemplatesCapture, color: THEME.secondaryColors.lightBrown },
  SMART_ROUTING: { Icon: TemplatesChat, color: THEME.secondaryColors.greenBright },
  CUSTOMER_SUPPORT: { Icon: TemplatesHeadphones, color: THEME.secondaryColors.aqua },
  ENGAGE: { Icon: TemplatesChat, color: THEME.secondaryColors.greenBright },
  ENGAGEMENT: { Icon: TemplatesChat, color: THEME.secondaryColors.greenBright },
  OPERATIONS: { Icon: TemplatesGrid, color: THEME.secondaryColors.aqua },
  REPORTING: { Icon: TemplatesReporting, color: THEME.secondaryColors.brightBlue },
  RECONCILIATION: { Icon: TemplatesReconciliation, color: THEME.secondaryColors.fuchsia },
  FRAUD: { Icon: TemplatesFraud, color: THEME.secondaryColors.greenBright },
  ORCHESTRATION: { Icon: TemplatesAutomation, color: THEME.secondaryColors.denimBlue },
};

const getAutomationTemplateIcon = (categories) => {
  if (!Array.isArray(categories)) throw new Error('categories must be an array');

  return categories
    .map((category) => ({
      Icon: CATEGORY_ICON_MAP[category]?.Icon || Bolt,
      color: CATEGORY_ICON_MAP[category]?.color || THEME.secondaryColors.aqua,
      key: category,
    }))
    .filter(Boolean);
};

export { getAutomationTemplateIcon };
