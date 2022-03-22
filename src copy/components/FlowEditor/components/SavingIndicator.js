import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const SavingIndicator = ({ isDataSaving }) => {
  const { t } = useTranslation();
  return (
    <Box
      position="absolute"
      bottom="18px"
      left="calc(50% - 106px)"
      border="1px solid #E6E9EC"
      px={2}
      py={1}
      borderRadius="18px"
      textAlign="center"
      width="180px"
      color="#787F88"
      zIndex={50}
      bgcolor="#f5f6f7"
    >
      {isDataSaving ? t('Saving...') : t('Your work is saved')}
    </Box>
  );
};

SavingIndicator.propTypes = {
  isDataSaving: PropTypes.bool.isRequired,
};
