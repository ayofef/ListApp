import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';
import { StyledCopyButton } from '../styled';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import Copy from '../../../../../assets/icons/FlowList/Copy';
import THEME from '../../../../../constants/theme';
import { P14 } from '../../../../../components/atoms';
import { automationPropType } from '../constant';

const TITLE = 'Flow ID';
const MESSAGE = 'Copied Flow ID to clipboard';
const TIME_OUT = 5000;
const COLOR = THEME.primaryColors.primary;

const SingleFlow = ({ paymentFlow }) => {
  const { t } = useTranslation();
  const [state, copyToClipboard] = useCopyToClipboard();

  useNotificationManager('error', state?.error, TITLE, TIME_OUT);

  const handleCopy = useCallback(() => {
    copyToClipboard(paymentFlow.instructFlowId);
    NotificationManager.success(t(MESSAGE), TITLE, TIME_OUT);
  }, [paymentFlow, copyToClipboard, t]);

  return (
    <Box>
      <StyledCopyButton title={t('Copy to clipboard')} type="button" onClick={handleCopy}>
        <P14 color={COLOR} fontFamily="Source Code Pro, monospace">
          {paymentFlow.id || ''}
        </P14>
        <Copy />
      </StyledCopyButton>
    </Box>
  );
};

SingleFlow.propTypes = {
  paymentFlow: automationPropType.isRequired,
};

export default SingleFlow;
