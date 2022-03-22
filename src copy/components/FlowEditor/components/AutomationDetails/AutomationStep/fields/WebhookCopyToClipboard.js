import React, { useCallback } from 'react';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { StyledCopyToClipboardBox, StyledCopyValue } from './styled';
import { CopyToClipboard } from '../../../../../atoms';
import Copy from '../../../../../../assets/icons/Copy';
import THEME from '../../../../../../constants/theme';

const WebhookCopyToClipboard = ({ value, desc }) => {
  const { t } = useTranslation();

  const handleCopy = useCallback(() => {
    NotificationManager.success(` ${t(`Copied ${desc?.toLowerCase()} to clipboard`)}`, t(desc), 5000);
  }, [t, desc]);

  return (
    <CopyToClipboard className="smallUrl" text={value} onCopy={handleCopy}>
      <StyledCopyToClipboardBox>
        <StyledCopyValue>{value}</StyledCopyValue>
        <Copy fill={THEME.greyColors.grey1} />
      </StyledCopyToClipboardBox>
    </CopyToClipboard>
  );
};

WebhookCopyToClipboard.propTypes = {
  value: PropTypes.string,
  desc: PropTypes.string.isRequired,
};

WebhookCopyToClipboard.defaultProps = {
  value: '',
};

export default WebhookCopyToClipboard;
