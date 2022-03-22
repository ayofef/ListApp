import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Info } from '../../../../../assets/icons';
import { P14 } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';

const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50px">
      <Info fill={THEME.secondaryColors.black2} />
      <P14 margin="0 0 0 8px">{t('No available options')}</P14>
    </Box>
  );
};

export default EmptyState;
