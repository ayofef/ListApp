import React, { useCallback, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';
import { P12, P14 } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import Copy from '../../../../../assets/icons/FlowList/Copy';
import { StyledIconButton } from './styled';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import LoadingState from './LoadingState';
import { PaymentFlowContext } from '../../../paymentFlowContext';

const TITLE = 'Flow ID';
const COPIED = 'Copied Flow ID to clipboard';

const COLOR = THEME.primaryColors.primary;

const FlowIdentifier = () => {
  const { t } = useTranslation();
  const [state, copyToClipboard] = useCopyToClipboard();
  const { flow, loading } = useContext(PaymentFlowContext);
  useNotificationManager('error', state?.error, TITLE, 5000);

  const handleCopy = useCallback(() => {
    copyToClipboard(flow?.id);
    NotificationManager.success(t(COPIED), TITLE, 5000);
  }, [copyToClipboard, flow?.id, t]);

  return (
    <Box mt="28px">
      {loading ? (
        <LoadingState />
      ) : (
        <Box>
          <P12 fontWeight="600" margin="0 0 8px 0">
            {t('Flow ID')}
          </P12>

          <StyledIconButton title={t('Copy to clipboard')} type="button" onClick={handleCopy}>
            <P14 color={COLOR} fontFamily="Source Code Pro, monospace">
              {flow?.id || ''}
            </P14>
            <Copy />
          </StyledIconButton>
        </Box>
      )}
    </Box>
  );
};

export default FlowIdentifier;
