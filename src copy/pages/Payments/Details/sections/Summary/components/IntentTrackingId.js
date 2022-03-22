import React from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from 'react-use';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';

import { P12 } from '../../../../../../components/atoms';
import Copy from '../../../../../../assets/icons/Copy';
import THEME from '../../../../../../constants/theme';
import { useNotificationManager } from '../../../../../../hooks/useNotificationManager';
import { StyledTrackingIdCopyButton } from './styled';
import { TOAST_TIMEOUT } from '../../../../../../constants/toasts';

const TITLE = 'Intent Tracking ID';
const MESSAGE = 'Copied Intent Tracking ID to clipboard';

const IntentTrackingId = ({ intentTrackingId }) => {
  const { t } = useTranslation();
  const [state, copyToClipboard] = useCopyToClipboard();
  useNotificationManager('error', state?.error, TITLE, TOAST_TIMEOUT);

  const handleCopy = () => {
    copyToClipboard(intentTrackingId);
    NotificationManager.success(t(MESSAGE), TITLE, TOAST_TIMEOUT);
  };

  return (
    <StyledTrackingIdCopyButton type="button" onClick={handleCopy}>
      <P12 color={THEME.greyColors.grey18} margin="0 6px 0 0">
        {intentTrackingId}
      </P12>
      <Copy fill={THEME.greyColors.grey1} size={16} />
    </StyledTrackingIdCopyButton>
  );
};

IntentTrackingId.propTypes = {
  intentTrackingId: PropTypes.string.isRequired,
};

export default IntentTrackingId;
