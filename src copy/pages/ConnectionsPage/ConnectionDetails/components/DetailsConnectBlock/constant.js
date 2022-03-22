import { CONNECTION_STATUS } from '../../../components/constant';

const LOGO_SIZE = '80px';
const SUB_TEXT_TRANSFORM = 'translateY(4px)';

const BUTTON_TYPES_MAP = {
  [CONNECTION_STATUS.CONNECTED]: 'secondary',
  [CONNECTION_STATUS.NOT_CONNECTED]: 'primary',
  [CONNECTION_STATUS.ARCHIVED]: 'primary',
  [CONNECTION_STATUS.BROKEN]: 'primary',
};

export { LOGO_SIZE, SUB_TEXT_TRANSFORM, BUTTON_TYPES_MAP };
