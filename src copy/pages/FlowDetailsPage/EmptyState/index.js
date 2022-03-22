import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import TakeAction from '../../../assets/img/TakeAction.svg';
import IconBoxScreen from '../../../components/common/IconBoxScreen';

const MESSAGE = 'Coming soon ..';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 150px)">
      <IconBoxScreen
        icon={<img src={TakeAction} alt="take action" />}
        iconMargin="0"
        description={t(MESSAGE)}
        padding="20px 200px"
      />
    </Box>
  );
};

export default EmptyState;
