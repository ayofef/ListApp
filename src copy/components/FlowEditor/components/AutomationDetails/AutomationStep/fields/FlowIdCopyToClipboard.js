import React from 'react';
import Box from '@material-ui/core/Box';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import Title from '../../Title';
import { StyledCopyToClipboardBox, StyledCopyValue, StyledFormControl } from './styled';
import { useFlowEditorContext } from '../../../../context';
import { CopyToClipboard } from '../../../../../atoms';
import THEME from '../../../../../../constants/theme';
import Copy from '../../../../../../assets/icons/Copy';

const FlowIdCopyToClipboard = () => {
  const { t } = useTranslation();
  const { flowId } = useFlowEditorContext();

  const handleCopy = () => {
    NotificationManager.success(` ${t(`Copied Flow ID to clipboard`)}`, t('Flow ID'), 5000);
  };

  return (
    <Box component="section">
      <Title fontSize="12px">Payment Instruct Flow ID:</Title>
      <StyledFormControl $bgColor={THEME.primaryColors.primaryLight} fullWidth>
        <CopyToClipboard className="smallUrl" text={flowId} onCopy={handleCopy} fill={THEME.primaryColors.primary}>
          <StyledCopyToClipboardBox>
            <StyledCopyValue $color={THEME.primaryColors.primary}>{flowId}</StyledCopyValue>
            <Copy fill={THEME.primaryColors.primary} />
          </StyledCopyToClipboardBox>
        </CopyToClipboard>
      </StyledFormControl>
    </Box>
  );
};

export default FlowIdCopyToClipboard;
