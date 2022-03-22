import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P14M } from '../../../components/atoms';

const AutomationsEmptyState = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      flex={1}
      padding="48px 0"
      alignItems="center"
      justifyContent="center"
    >
      <P14M width="250px" textAlign="center">
        {t('You don’t have any running automations yet')}
      </P14M>
    </Box>
  );
};

export default AutomationsEmptyState;
