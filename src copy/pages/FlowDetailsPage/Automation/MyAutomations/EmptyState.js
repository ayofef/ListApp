import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import ListEmptyState from '../../../../components/ListEmptyState';

const TITLE = 'Automations';
const DESC = 'You currently have no automations';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <Box position="relative" height="300px !important">
      <ListEmptyState title={t(TITLE)} description={t(DESC)} top="40%" />
    </Box>
  );
};

export default EmptyState;
