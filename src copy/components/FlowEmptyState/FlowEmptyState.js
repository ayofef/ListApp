import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { EmptyStateIcon } from '../../assets/icons/EmptyStateIcon';

const FlowEmptyState = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" color="#787F88">
      <EmptyStateIcon />

      <Box component="p" fontSize="14px" textAlign="center">
        {t('There are no flow yet')}
      </Box>
    </Box>
  );
};

export default FlowEmptyState;
