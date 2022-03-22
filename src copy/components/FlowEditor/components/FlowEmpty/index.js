import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useFlowEditorContext } from '../../context';
import { StyledFlowEmpty } from './styled';
import { EmptyStateIcon } from '../../../../assets/icons/EmptyStateIcon';

const FlowEmpty = () => {
  const { t } = useTranslation();
  const { drawerStatus } = useFlowEditorContext();

  return (
    <StyledFlowEmpty display="flex" flexDirection="column" alignItems="center" color="#787F88" open={drawerStatus}>
      <EmptyStateIcon />

      <Box component="p" m="30px 0 0" fontSize="14px" textAlign="center">
        {t('Start creating a flow by pulling in the nodes from the left-side panel')}
      </Box>
    </StyledFlowEmpty>
  );
};

export default FlowEmpty;
